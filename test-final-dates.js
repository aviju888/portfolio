// Final test for date formatting
function formatDateRange(start, end) {
  // Handle YYYY-MM format by parsing year and month directly
  let startFormatted;
  if (start.includes('-') && start.split('-').length === 2) {
    const [year, month] = start.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    startFormatted = `${monthNames[parseInt(month) - 1]} ${year}`;
  } else {
    const startDate = new Date(start);
    startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  if (end === null) {
    return `${startFormatted} — Present`;
  }
  
  let endFormatted;
  if (end.includes('-') && end.split('-').length === 2) {
    const [year, month] = end.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    endFormatted = `${monthNames[parseInt(month) - 1]} ${year}`;
  } else {
    const endDate = new Date(end);
    endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  return `${startFormatted} — ${endFormatted}`;
}

console.log('Final date formatting test:');
console.log('Freelance Photography (2022-01):', formatDateRange('2022-01', null));
console.log('Apex Agent Labs (2024-09):', formatDateRange('2024-09', null));
console.log('KOSMOS Design Lead (2022-03 to 2025-08):', formatDateRange('2022-03', '2025-08'));
console.log('Dowork ML (2023-05 to 2023-09):', formatDateRange('2023-05', '2023-09'));
console.log('Berkeley Lab (2021-06 to 2021-07):', formatDateRange('2021-06', '2021-07'));
