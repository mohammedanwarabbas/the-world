import React, { useState, useEffect } from 'react';
import {Stack, Button,Card,CardActions,CardMedia,CardContent,Grid, FormControl,Select,MenuItem, TextField, IconButton,InputAdornment, AppBar, Toolbar, Container, Typography } from '@mui/material';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import SearchIcon from '@mui/icons-material/Search';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import { lightTheme, darkTheme } from '../themes/themes';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { debounce } from 'lodash';
import InfoDialog from './InfoDialog';
import { Modal, Backdrop, Fade } from '@mui/material';
import CountryModal from './CountryModal';

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      alt:string;
    };
    population: number;
    region: string;
    capital: string[];
    // Add other properties as needed
  }


function Home() {

    const fetchData = async () => {
        try {
          const url = `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`;
          const response = await fetch(url);
      
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
      
          const data = await response.json();
          setCountries(data);
        } catch (error:any) {
          setCountries([]);
          console.error(`Error: ${error.message}`);
        }
      };
    const debouncedFetchData = debounce(fetchData, 500);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    // countries[] stores fetched data
    const [countries,setCountries] = useState<Country[]>([])
    // countryFilter stores user search text to display india, indonesia for text "in"
    const [countryFilter,setCountryFilter] = useState<string>('')
    //regionFilter to store region of country like afric,america etc
    const [regionFilter,setRegionFilter] = useState<string>('')
    //selectedCountry to store single country for more info model
    const [selectedCountry, setSelectedCountry] = useState(null);
    // openCountryModal store true-false for moreinfo model
    const [openCountryModal, setOpenCountryModal] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLearnMore = (country:any) => {
        setSelectedCountry(country);
        setOpenCountryModal(true);
      };

    useEffect(() => {
        const body = document.body;
        body.style.backgroundColor = isDarkMode ? 'rgba(33, 41, 56, 1)' : '#fafafa';
    }, [isDarkMode]);

    useEffect(()=>{
        fetchData();
    },[])


    
    
    
    

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {/* InfoDialog for developer intro in the initial rendering */}
            <InfoDialog />
            {/* CountryModal a popup modal works for more info button for selected country */}
            <CountryModal openCountryModal={openCountryModal} onClose={() => setOpenCountryModal(false)} country={selectedCountry} />
            <AppBar position="static" sx={{ margin: 0 }}>
                <Toolbar>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography variant="h6">
                            The World
                        </Typography>
                        <IconButton color="inherit" onClick={toggleDarkMode} disableRipple>
                            {isDarkMode ? <NightlightRoundOutlinedIcon /> : <NightlightOutlinedIcon />}
                            <Typography variant="body1" color="inherit" sx={{ marginLeft: '8px' }}>
                                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </Typography>
                        </IconButton>
                    </Container>
                </Toolbar>
            </AppBar>
                       <Container sx={{ marginTop: '2rem',marginBottom:'2rem' }}>
                       <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={6}>
                <TextField 
                onChange={(e)=>{setCountryFilter(e.target.value)}}
                size='small'
                    placeholder="Search for a country..."
                    value={countryFilter}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}

                    sx={{
                        width: { xs: '100%', md: 'auto' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            border: 'none', // Remove border from TextField
                          },
                        },
                      }}
                      
                />
                </Grid>
                <Grid item xs={12} md={3} sx={{}}>
               <Select
                    displayEmpty
                    defaultValue=""
                    variant="standard"
                    onChange={(e)=> setRegionFilter(e.target.value)}
                    value={regionFilter}
                    sx={{
                        width: { xs: '100%' },
                    }}
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="Africa">Africa</MenuItem>
                    <MenuItem value="americas">Americas</MenuItem>
                    <MenuItem value="antarctic">Antarctic</MenuItem>
                    <MenuItem value="asia">Asia</MenuItem>
                    <MenuItem value="europe">Europe</MenuItem>
                    <MenuItem value="oceania">Oceania</MenuItem>
                </Select>
                
                </Grid>
                </Grid>

            </Container>
            <Container maxWidth="lg" style={{marginTop:'1rem'}}>
            <Grid container spacing={2}>
               {countries.filter((country)=>{return country?.name?.common?.toLowerCase().includes(countryFilter.toLowerCase()) && (regionFilter? country?.region.toLocaleLowerCase() == regionFilter.toLocaleLowerCase() : true)}). map(country => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={country.name.common}>
                        <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={country?.flags?.png}
                                    alt={country?.flags?.alt}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {country?.name?.common}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">{`Population : ${country.population}`}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`Region : ${country.region}`}</Typography>
                                    <Typography variant="body2" color="textSecondary">{`Capital : ${country.capital}`}</Typography>
                                    
                                </CardContent>
                                <CardActions>
        <Button size="small" onClick={() => handleLearnMore(country)}>Learn More</Button>
      </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </ThemeProvider>
    );
}

export default Home;
