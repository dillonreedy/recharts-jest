/**
 * @jest-environment jsdom
 */
import React from 'react';
import { LineChartWrapper, handleMouseOver, handleSyncMethod } from './data/LineChart.data';

function setup(jsx) {
  const { container } = render(jsx);
  return {
    user: userEvent.setup(),
    container
  };
}

test('Can create a test snapshot', async () => {
  const {container} = setup(<LineChartWrapper />);
  expect(container).toMatchSnapshot;
});

test('A cursor does not exist', async () => {
  const {container} = setup(<LineChartWrapper />);
  expect(container.querySelector('recharts-tooltip-cursor')).toBeNull;
});

test('Tooltip wrapper exists', () => {
  const {container} = setup(<LineChartWrapper />);
  expect(container.querySelector('recharts-tooltip-wrapper')).not.toBeNull;
});

test('Tooltips are not visible by default', () => {
  const {container} = setup(<LineChartWrapper />);
  expect(container.querySelector('recharts-tooltip-wrapper')).not.toBeVisible;
})

test('Both tooltips are visible on hover', () => {
  const {user, container} = setup(<LineChartWrapper />);
  const element = container.querySelector('recharts-tooltip-wrapper');

  user.hover(element)
      .then(() => {
        const tooltipElements = container.querySelectorAll('recharts-tooltip-wrapper');

        tooltipElements.forEach((tooltipElement) => {
          expect(tooltipElement).toBeVisible
        });

        expect(handleMouseOver.mock.calls.length).toBe(2);
        expect(handleSyncMethod.mock.calls.length).toBe(2);
      })
});

test('Correct values are displayed on tooltips', () => {
  const {user, container} = setup(<LineChartWrapper />);
  const element = container.querySelector('recharts-tooltip-wrapper');

  user.hover(element)
      .then(() => {
        const tooltipElements = container.querySelectorAll('recharts-tooltip-item-value');

        expect(tooltipElements[0].props().value).toBe(400);
        expect(tooltipElements[1].props().value).toBe(550);

      })
});


