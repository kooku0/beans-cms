/* eslint-disable import/prefer-default-export, react/prop-types, react/jsx-props-no-spreading */
import { Tooltip } from 'chart.js';

export function Line({
  data, options, plugins, ...rest
}) {
  const { tooltip } = options.plugins;
  const { title, label, footer } = tooltip.callbacks;
  const { position } = tooltip;
  const { datasets } = data;

  const chart = {
    tooltip: {
      _active: [{ element: { x: 0, y: 0 } }],
    },
    chartArea: { top: 0, bottom: 0 },
    ctx: {
      save: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      restore: jest.fn(),
      lineWidth: jest.fn(),
      strokeStyle: jest.fn(),
    },
  };

  title?.();
  label?.({
    raw: 1000,
  });
  footer?.();

  if (position) {
    Tooltip.positioners[position]([{ element: { x: 0 } }], { chart });
    Tooltip.positioners[position]([], { chart: null });
  }

  plugins?.forEach((plugin) => {
    if (typeof plugin?.beforeDraw === 'function') {
      plugin?.beforeDraw(chart);
      plugin?.beforeDraw({
        ...chart,
        tooltip: {
          _active: [],
        },
      });
    }
  });

  datasets?.forEach((dataset) => {
    if (typeof dataset?.pointRadius === 'function') {
      dataset?.pointRadius?.({
        dataIndex: 0,
      });
      dataset?.pointRadius?.({
        dataIndex: 2,
      });
    }

    dataset?.datalabels?.labels?.high?.formatter('5000', {
      dataIndex: 0,
    });
    dataset?.datalabels?.labels?.high?.formatter('5000', {
      dataIndex: 2,
    });
    dataset?.datalabels?.labels?.low?.formatter('5000', {
      dataIndex: 3,
    });
  });

  return <div data-testid="chart-line" {...rest} />;
}

export function Doughnut({
  options, ...rest
}) {
  const { tooltip } = options.plugins;
  const { title, label, footer } = tooltip.callbacks;

  title?.();
  label?.({
    raw: 1000,
  });
  footer?.([{
    parsed: 1234,
  }]);

  return <div data-testid="chart-doughnut" {...rest} />;
}
