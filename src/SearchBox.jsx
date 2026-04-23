import { useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InfoBox from './InfoBox';

const getSkyClass = (weather) => {
    const code = weather?.weathercode;

    if (code === undefined || code === null) {
        return 'sky-default';
    }
    if (code === 0) return 'sky-sunny';
    if ([1, 2, 3].includes(code)) return 'sky-cloudy';
    if ([45, 48].includes(code)) return 'sky-fog';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return 'sky-rain';
    if ([71, 73, 75].includes(code)) return 'sky-snow';
    if ([95, 96, 99].includes(code)) return 'sky-storm';

    return 'sky-default';
};

export default function SearchBox() {
    const [city, setCity] = useState('');
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const skyClass = useMemo(() => getSkyClass(weather), [weather]);

    const getWeatherInfo = async (searchCity) => {
        try {
            setLoading(true);
            setError('');
            setWeather(null);
            setLocation(null);

            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1&language=en&format=json`
            );

            if (!geoResponse.ok) {
                throw new Error(`City lookup failed (${geoResponse.status})`);
            }

            const geoData = await geoResponse.json();
            const match = geoData?.results?.[0];

            if (!match) {
                throw new Error(`No location found for "${searchCity}"`);
            }

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${match.latitude}&longitude=${match.longitude}&current_weather=true&timezone=auto&temperature_unit=celsius`
            );

            if (!weatherResponse.ok) {
                throw new Error(`Weather request failed (${weatherResponse.status})`);
            }

            const weatherData = await weatherResponse.json();

            setLocation({
                city: match.name,
                region: match.admin1,
                country: match.country,
            });
            setWeather(weatherData.current_weather);
        } catch (fetchError) {
            setError(fetchError.message || 'Could not fetch weather.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedCity = city.trim();

        if (!trimmedCity) {
            setError('Please enter a city name before searching.');
            return;
        }

        getWeatherInfo(trimmedCity);
    };

    return (
        <Box className={`weather-shell ${skyClass}`}>
            <Box className="weather-orb weather-orb-a" />
            <Box className="weather-orb weather-orb-b" />
            <Box className="weather-orb weather-orb-c" />

            <Box className="weather-panel">
                <Stack spacing={1}>
                    <Typography variant="overline" sx={{ letterSpacing: 3, color: 'rgba(15, 23, 42, 0.7)' }}>
                        Live weather
                    </Typography>
                    <Typography variant="h3" className="weather-title">
                        Search any city
                    </Typography>
                    <Typography className="weather-subtitle">
                        Get a clean forecast card with motion, icon cues, and a responsive sky backdrop.
                    </Typography>
                </Stack>

                <Box component="form" onSubmit={handleSubmit} className="weather-form">
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: '#0f172a',
                                '& fieldset': { borderColor: 'rgba(15, 23, 42, 0.18)' },
                                '&:hover fieldset': { borderColor: 'rgba(15, 23, 42, 0.35)' },
                                '&.Mui-focused fieldset': { borderColor: '#1d4ed8' },
                            },
                            '& .MuiInputLabel-root': { color: 'rgba(15, 23, 42, 0.72)' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#1d4ed8' },
                        }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                            minWidth: 140,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 800,
                            boxShadow: 'none',
                        }}
                    >
                        {loading ? <CircularProgress size={22} color="inherit" /> : 'Search'}
                    </Button>
                </Box>

                {error ? <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert> : null}
                <InfoBox weather={weather} location={location} open={Boolean(weather && location)} />
            </Box>
        </Box>
    );
}
