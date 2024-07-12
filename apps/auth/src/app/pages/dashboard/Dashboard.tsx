import { Grid, Typography } from '@mui/material';
import BreakGraph from './BreakGraph';
import ScheduleAdherence from './ScheduleAdherence';
import HoursAdherence from './HoursAdherence';

const Dashboard = () => {
  return (
    <div className="maindiv bg-gray-50  w-full pb-2 mt-16">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <Typography variant="h5" component="h5" className="text-[26px]">
          Dashboard
        </Typography>
      </div>
      <div className="bg-customWhite flex p-3">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ScheduleAdherence />
          </Grid>
          <Grid item xs={12} md={6}>
            <HoursAdherence />
          </Grid>
          <Grid item xs={12} md={6}>
            <BreakGraph />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Dashboard;
