import React from 'react';
import { Modal, Backdrop, Fade, Typography, Grid, Paper } from '@mui/material';

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      alt:string;
    };
    tld:string[];
    currencies: {
        AOA: {
          name: string;
          symbol: string;
        };
      };
      languages: {
        [key: string]: string;
      };
    population: number;
    region: string;
    subregion:string;
    capital: string[];
    // Add other properties as needed
}

interface CountryModalProps {
    openCountryModal: boolean;
    onClose: () => void;
    country: Country | null;
}

const CountryModal: React.FC<CountryModalProps> = ({ openCountryModal, onClose, country }) => {
    return (
        <Modal
        style={{backgroundColor:'rgba(0,0,0,0.9)'}}
        open={openCountryModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
            sx: {
                backgroundColor: 'transparent',
            },
            timeout: 500,
        }}
    >
            <Fade in={openCountryModal}>
                <div>
                    <Grid container spacing={2} style={{display:"flex",justifyContent:"center"}}>
                        {country && (
                            <Grid item xs={12} style={{margin:'auto',textAlign:'center'}}>
                                <Typography variant="h4" align="center" gutterBottom style={{color:'white'}}>{"|"+country.name.common+"|"}</Typography>
                                <img src={country.flags.png} alt={country.flags.alt} style={{  maxWidth: '70%',height: 'auto',margin: '0 auto',display: 'block',marginTop:'1rem' ,borderRadius:'1rem'}} />
                            </Grid>
                        )}
                        {/* fix it asap as it cuts in mobile screen */}
                        {/* <Grid item xs={12} md={6}  style={{display:"flex",justifyContent:"center"}}>
                            <Paper style={{ padding: '1rem' }}>
                            <Typography variant="h6" gutterBottom>Basic Information</Typography>
<Typography variant="body1" >Population: <Typography color="textSecondary" component="span">{country?.population}</Typography></Typography>
<Typography variant="body1" >Region: <Typography color="textSecondary" component="span">{country?.region}</Typography></Typography>
<Typography variant="body1" >Sub Region: <Typography color="textSecondary" component="span">{country?.subregion}</Typography></Typography>
<Typography variant="body1" >Capital: <Typography color="textSecondary" component="span">{country?.capital.join(', ')}</Typography></Typography>

                            </Paper>
                        </Grid> 
                        <Grid item xs={12} md={6} style={{display:"flex",justifyContent:"center"}}>
                            <Paper style={{ padding: '1rem' }} >
                                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                                <Typography variant="body1">Top Level Domain: <Typography color="textSecondary" component="span">{country?.tld.join(', ')}</Typography></Typography>
                                <Typography variant="body1">Currencies:</Typography>
                                <ul>
  {country?.currencies && Object.entries(country.currencies).map(([code, currency]) => (
    <Typography color="textSecondary" component="span"><li key={code}>{currency.name} ({currency.symbol})</li></Typography>
  ))}
</ul>
                                {country?.languages && (<Typography variant="body1">Languages: <Typography color="textSecondary" component="span">{Object.values(country.languages).join(', ')}</Typography></Typography>)}
                            </Paper>
                        </Grid> */}

<Grid item xs={12} md={6} style={{display:"flex",justifyContent:"center"}}>
                            <Paper style={{ padding: '1rem' }} >
                                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                                <Typography variant="body1">Top Level Domain: <Typography color="textSecondary" component="span">{country?.tld?.join(', ')}</Typography></Typography>
                                <Typography variant="body1">Currencies:</Typography>
                                <ul>
  {country?.currencies && Object.entries(country.currencies).map(([code, currency]) => (
    <Typography color="textSecondary" component="span"><li key={code}>{currency.name} ({currency.symbol})</li></Typography>
  ))}
</ul>
                                {country?.languages && (<Typography variant="body1">Languages: <Typography color="textSecondary" component="span">{Object.values(country.languages).join(', ')}</Typography></Typography>)}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    );
};

export default CountryModal;
