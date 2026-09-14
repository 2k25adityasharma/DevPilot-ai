const path = require('path');
const HabitsData = require(path.join(__dirname, '../../js/data/habitsData.js'));

function runTests() {
  console.log('====================================================');
  console.log(' DevPilot-AI: Testing Heatmap UX & Day History');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✓ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${message}`);
      failed++;
    }
  }

  const today = '2026-09-14';
  const habits = [
    { id: 'h1', title: 'Daily LeetCode Problem', category: 'Coding', target_frequency: 'daily', active: true },
    { id: 'h2', title: 'System Design Reading', category: 'Learning', target_frequency: 'weekdays', active: true },
    { id: 'h3', title: 'Drink 3L Water', category: 'Health', target_frequency: 'daily', active: true }
  ];

  const completions = [
    { habit_id: 'h1', completion_date: '2026-09-14' },
    { habit_id: 'h3', completion_date: '2026-09-14' },
    { habit_id: 'h1', completion_date: '2026-09-13' }
  ];

  const dailyGoals = [
    { id: 'g1', title: 'Complete 2 PR reviews', target: 2, completed: true, date: '2026-09-14' }
  ];

  // TEST 1: Heatmap generates exactly 26 weeks
  const weeks = HabitsData.calculateHeatmapMatrix(habits, completions, 26, today, dailyGoals);
  assert(weeks && weeks.length === 26, `Heatmap matrix generates exactly 26 weeks (received: ${weeks.length})`);

  // TEST 2: Month header alignment logic sums to exactly 26 columns without gap
  const monthSpans = [];
  let currentMonth = -1;

  weeks.forEach((week, wIdx) => {
    for (let d = 0; d < week.length; d++) {
      const dObj = HabitsData.parseDate(week[d].date);
      const m = dObj.getMonth();
      if (m !== currentMonth) {
        currentMonth = m;
        const prev = monthSpans[monthSpans.length - 1];
        if (!prev || (wIdx - prev.colIndex >= 2)) {
          monthSpans.push({
            name: dObj.toLocaleDateString('en-US', { month: 'short' }),
            colIndex: wIdx
          });
        }
        break;
      }
    }
  });

  for (let i = 0; i < monthSpans.length; i++) {
    const startCol = monthSpans[i].colIndex;
    const endCol = (i + 1 < monthSpans.length) ? monthSpans[i + 1].colIndex : weeks.length;
    monthSpans[i].span = Math.max(1, endCol - startCol);
  }

  const totalSpan = monthSpans.reduce((sum, m) => sum + m.span, 0);
  assert(totalSpan === 26, `Month spans sum to exactly 26 columns without gap (total: ${totalSpan})`);
  assert(monthSpans.length >= 4, `At least 4-6 months tracked in 26-week span (found: ${monthSpans.length})`);

  const lastMonth = monthSpans[monthSpans.length - 1];
  assert(lastMonth.colIndex + lastMonth.span === 26, `Last month ends exactly at column 26 (${lastMonth.name} span: ${lastMonth.span})`);

  // TEST 3: Day History breakdown calculates accurately for today
  const { byDate } = HabitsData.buildCompletionMaps(habits, completions);
  const completedToday = byDate['2026-09-14'] || new Set();
  assert(completedToday.has('h1') && completedToday.has('h3'), 'Today has h1 and h3 completed');
  assert(!completedToday.has('h2'), 'Today has h2 pending/missed');

  const missedToday = habits.filter(h => h.active && !completedToday.has(h.id) && HabitsData.isHabitScheduledOn(h, '2026-09-14'));
  assert(missedToday.length === 1 && missedToday[0].id === 'h2', 'Missed list correctly identifies h2 for today');

  // TEST 4: Daily goals included in day history
  const goalsToday = dailyGoals.filter(g => g.date === '2026-09-14');
  assert(goalsToday.length === 1 && goalsToday[0].completed === true, 'Daily goal correctly linked to today');

  console.log('\n====================================================');
  console.log(` Test Execution Complete: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runTests();
