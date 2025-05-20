import { reactive } from 'vue';

const state = reactive({
  league: localStorage.getItem('league') || ''
});

export const update_league = (newValue) => {
  state.league = newValue;
  localStorage.setItem('league', newValue);
};

// Listen for storage changes from other tabs/windows
window.addEventListener('storage', (event) => {
  if (event.key === 'league') {
    state.myData = event.newValue || '';
  }
});

export default state;
