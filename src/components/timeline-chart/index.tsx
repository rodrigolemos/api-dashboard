import { useCallback, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactLoading from 'react-loading';
import { useAPIInfo } from '../../hooks/api-info'
import { mock } from '../../data/fake-timeline';

export interface ITimeline {
  series: {
    name: string;
    data: number[];
  };
  categories: string[];
}

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

const TimelineChart = (): React.ReactElement => {
  const { APIInfo } = useAPIInfo();

  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const [chartData, setChartData] = useState<any>({
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: 'area'
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      yaxis: {
        show: false
      },
      xaxis: {
        type: 'category',
        categories: []
      },
    },
  });

  const fetchTimeline = useCallback(async (api: string | undefined): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {
      
      if (!api) return;

      const timeline = await mock(
        api,
        'additionalFilters',
        true,
        0
      );

      setChartData((prevState: any) => {
        prevState.series = [timeline.series];
        prevState.options.xaxis.categories = timeline.categories;
        return prevState;
      });

      setRequestStatus({
        isLoading: false,
        isError: false
      });

    } catch (error) {

      setRequestStatus({
        isLoading: false,
        isError: error.message
      });
    }

  }, []);

  useEffect(() => {
    fetchTimeline(APIInfo?.route);
  }, [fetchTimeline, APIInfo?.route]);

  return (
    <div id="timeline-chart">
      {!requestStatus.isLoading ? (
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={110} />
      ) : (
        <ReactLoading type="spin" color="#2684FF" height="15px" width="15px" />
      )}
    </div>
  );
}

export default TimelineChart
