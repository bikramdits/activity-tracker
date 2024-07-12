
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{ width: 20, height: 20 }} />
    </Box>
  );
}
