import './App.css';
import ItemCard from './ItemCard';
import Header from './Header';
import ItemCardContainer from './ItemCardContainer';
import Box from '@mui/material/Box';

function App() {
  const theme = {
    60: '#2f97c1',
    30: '#E8E9ED',
    10: '#0E103D'
  }
  return (
    <Box sx={{backgroundColor: theme[60]}}>
      <Header theme={theme}></Header>
      <ItemCardContainer theme={theme}></ItemCardContainer>
    </Box>
  );
}

export default App;
