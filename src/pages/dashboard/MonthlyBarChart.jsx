import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// third-party
import ReactApexChart from 'react-apexcharts';
import axiosClient from 'axiosClient';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};
// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 365
    },
    xaxis: {
      labels: {
        style: {
          colors: []
        }
      },
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    colors: [info]
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosClient.get('/weekly-statistics');
        console.log(response);
        const data = response.data;
        setTotalRevenue(data.total_revenue);
        setSeries([{ data: data.daily_totals }]);
      } catch (error) {
        console.error('Error fetching weekly statistics:', error);
      }
    };

    fetchStatistics();

    setOptions((prevState) => ({
      ...prevState,
      xaxis: {
        ...prevState.xaxis,
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      }
    }));
  }, [primary, info, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
