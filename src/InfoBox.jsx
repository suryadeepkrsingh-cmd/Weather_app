import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const weatherDescriptions = {
    0: { label: 'Clear sky', type: 'sun' },
    1: { label: 'Mainly clear', type: 'partly' },
    2: { label: 'Partly cloudy', type: 'partly' },
    3: { label: 'Overcast', type: 'cloudy' },
    45: { label: 'Fog', type: 'fog' },
    48: { label: 'Rime fog', type: 'fog' },
    51: { label: 'Light drizzle', type: 'rain' },
    53: { label: 'Moderate drizzle', type: 'rain' },
    55: { label: 'Dense drizzle', type: 'rain' },
    56: { label: 'Freezing drizzle', type: 'rain' },
    57: { label: 'Dense freezing drizzle', type: 'rain' },
    61: { label: 'Slight rain', type: 'rain' },
    63: { label: 'Moderate rain', type: 'rain' },
    65: { label: 'Heavy rain', type: 'rain' },
    71: { label: 'Slight snow', type: 'snow' },
    73: { label: 'Moderate snow', type: 'snow' },
    75: { label: 'Heavy snow', type: 'snow' },
    80: { label: 'Rain showers', type: 'rain' },
    81: { label: 'Heavy showers', type: 'rain' },
    82: { label: 'Violent showers', type: 'storm' },
    95: { label: 'Thunderstorm', type: 'storm' },
    96: { label: 'Thunderstorm with hail', type: 'storm' },
    99: { label: 'Thunderstorm with hail', type: 'storm' },
};

function WeatherGlyph({ type }) {
    const common = {
        width: 64,
        height: 64,
        viewBox: '0 0 64 64',
        fill: 'none',
        'aria-hidden': 'true',
        focusable: 'false',
    };

    if (type === 'sun') {
        return (
            <svg {...common}>
                <circle cx="32" cy="32" r="11" fill="#f59e0b" />
                <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
                    <path d="M32 8v8" />
                    <path d="M32 48v8" />
                    <path d="M8 32h8" />
                    <path d="M48 32h8" />
                    <path d="M15 15l6 6" />
                    <path d="M43 43l6 6" />
                    <path d="M43 21l6-6" />
                    <path d="M15 49l6-6" />
                </g>
            </svg>
        );
    }

    if (type === 'partly') {
        return (
            <svg {...common}>
                <circle cx="23" cy="23" r="9" fill="#fbbf24" />
                <path
                    d="M18 45h25c5 0 9-4 9-9s-4-9-9-9c-2 0-4 1-5 2-2-5-6-8-12-8-7 0-13 6-13 13 0 6 5 11 5 11z"
                    fill="#cbd5e1"
                />
            </svg>
        );
    }

    if (type === 'cloudy') {
        return (
            <svg {...common}>
                <path
                    d="M20 44h26c6 0 10-4 10-10s-4-10-10-10c-2 0-4 1-5 2-2-6-7-10-13-10-8 0-15 7-15 15 0 7 6 13 7 13z"
                    fill="#cbd5e1"
                />
            </svg>
        );
    }

    if (type === 'fog') {
        return (
            <svg {...common}>
                <g stroke="#94a3b8" strokeWidth="4" strokeLinecap="round">
                    <path d="M12 24h40" />
                    <path d="M8 34h48" />
                    <path d="M14 44h36" />
                </g>
            </svg>
        );
    }

    if (type === 'snow') {
        return (
            <svg {...common}>
                <path
                    d="M18 40h28c6 0 10-4 10-10s-4-10-10-10c-2 0-4 1-5 2-2-5-6-8-12-8-7 0-13 6-13 13 0 6 5 11 2 11z"
                    fill="#cbd5e1"
                />
                <g stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M24 47v6" />
                    <path d="M21 50h6" />
                    <path d="M39 47v6" />
                    <path d="M36 50h6" />
                    <path d="M31 44v6" />
                    <path d="M28 47h6" />
                </g>
            </svg>
        );
    }

    if (type === 'storm') {
        return (
            <svg {...common}>
                <path
                    d="M18 38h28c6 0 10-4 10-10s-4-10-10-10c-2 0-4 1-5 2-2-5-6-8-12-8-7 0-13 6-13 13 0 6 5 11 2 11z"
                    fill="#94a3b8"
                />
                <path d="M30 38l-5 11h7l-2 11 10-15h-7l5-7z" fill="#fbbf24" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <path
                d="M20 42h24c5 0 9-4 9-9s-4-9-9-9c-1 0-3 0-4 1-2-4-5-6-10-6-6 0-11 5-11 11 0 6 5 12 1 12z"
                fill="#94a3b8"
            />
        </svg>
    );
}

export default function InfoBox({ weather, location, open }) {
    if (!weather || !location) {
        return null;
    }

    const condition = weatherDescriptions[weather.weathercode] || { label: 'Unknown weather', type: 'default' };

    return (
        <Grow in={open} timeout={450}>
            <Card
                elevation={0}
                className="weather-result"
                sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: { xs: 2.5, sm: 3.25 } }}>
                    <Stack spacing={1.5}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: 2,
                            }}
                        >
                            <div>
                                <Typography variant="overline" sx={{ letterSpacing: 2, color: 'rgba(15,23,42,0.7)' }}>
                                    Current weather
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                    {location.city}
                                </Typography>
                                <Typography sx={{ color: 'rgba(15,23,42,0.72)' }}>
                                    {location.region ? `${location.region}, ` : ''}
                                    {location.country}
                                </Typography>
                            </div>

                            <Stack spacing={0.5} sx={{ alignItems: 'flex-end' }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        color: '#1d4ed8',
                                        display: 'grid',
                                        placeItems: 'center',
                                        filter: 'drop-shadow(0 8px 20px rgba(29, 78, 216, 0.2))',
                                    }}
                                >
                                    <WeatherGlyph type={condition.type} />
                                </Box>
                                <Chip
                                    label={`${Math.round(weather.temperature)} C`}
                                    sx={{
                                        fontWeight: 800,
                                        borderRadius: 999,
                                        color: '#0f172a',
                                        background: 'linear-gradient(135deg, #eff6ff, #ffffff)',
                                    }}
                                />
                            </Stack>
                        </Stack>

                        <Divider flexItem sx={{ borderColor: 'rgba(15, 23, 42, 0.12)' }} />

                        <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 600 }}>
                            {condition.label}
                        </Typography>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1.2}
                            useFlexGap
                            sx={{ flexWrap: 'wrap' }}
                        >
                            <Chip label={`Feels like ${Math.round(weather.temperature)} C`} variant="outlined" sx={{ color: '#0f172a', borderColor: 'rgba(15, 23, 42, 0.14)' }} />
                            <Chip label={`Wind ${weather.windspeed} km/h`} variant="outlined" sx={{ color: '#0f172a', borderColor: 'rgba(15, 23, 42, 0.14)' }} />
                            <Chip label={`Direction ${weather.winddirection} deg`} variant="outlined" sx={{ color: '#0f172a', borderColor: 'rgba(15, 23, 42, 0.14)' }} />
                            <Chip label={weather.time} variant="outlined" sx={{ color: '#0f172a', borderColor: 'rgba(15, 23, 42, 0.14)' }} />
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Grow>
    );
}
