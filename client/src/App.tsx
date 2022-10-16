import './App.css';
import ItemCard from './ItemCard';
import Header from './Header';
import ItemCardContainer from './ItemCardContainer';
import Box from '@mui/material/Box';

function App() {
  const theme = {
    60: '#FFFFFF',
    30: '#DADADA',
    10: '#000000'
  }
  return (
    <Box sx={{backgroundColor: theme[60]}}>
      <Header theme={theme}></Header>
      <ItemCardContainer theme={theme}></ItemCardContainer>
    </Box>
  );
}

export default App;
