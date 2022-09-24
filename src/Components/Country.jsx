import  { useEffect, useState } from 'react'
import axios from "axios"
import * as React from 'react';
import styles from "./country.module.css"
import {Stack,Box,Input,Typography,Avatar} from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Country = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const [sorted, setSorted] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   
    const [age, setAge] = React.useState('');
    const [filter, setFilter] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
   
    axios.get(`https://restcountries.com/v3.1/all?_sortBy=population&_order=${age}`)
    .then(resp => setData(resp.data))
    .catch(error => {
        console.log(error);
    });
    
        // axios.get( `https://restcountries.com/v3.1/all?_sort=population&_order=${age}`)
        // .then((res) => console.log(res.data))
  };

    console.log(age)
    
    const handleRegionChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
       
        axios.get(`https://restcountries.com/v3.1/all?q=${filter}`)
        .then((res) => setData(res.data.reverse()))
        
    }
    
    
 function getData(query) {
    setLoading(true)
   
    axios.get(`https://restcountries.com/v3.1/all?q=${filter}`)
    .then((res) => {
       console.log(res.data)
       setData(res.data)
   })
   .catch((err) => setError(true))
   .finally(() => setLoading(false))
 }
    useEffect(()=> {
       getData()
    },[filter,age])

   console.log(filter)



  return loading ? (<img style={{width: "20%", marginTop: "20%"}} src="https://c.tenor.com/On7kvXhzml4AAAAC/loading-gif.gif" />) :
   error ? (<img src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif"/>) : 
  (
    <>

    
<Box >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Filter By Region</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={handleRegionChange}
          label="Filter By Region"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          
        </Select>
      </FormControl>
      
    </Box>
        <Box >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Sort By Population</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Sort By Population"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
          
        </Select>
      </FormControl>
      
    </Box>

       
       <Box  className = {styles.container}>
          { data && data.map((el) => (<Box id={el.area} style={{padding: "10px"}} className={styles.box}>
            <Avatar className={styles.avatar} width={{sm: "100px",md:"120px",lg:"150px",xl:"160px",base:"80px"}}  alt="Flag Avatars" src={el.flags.png} />
            <Typography className={styles.text} fontSize={{sm: "16px",md:"18px",lg:"20px",xl:"22px",base:"14px"}} style={{fontWeight: "bold"}} > {el.name.common}</Typography>
            <Typography className={styles.text} fontSize={{sm: "16px",md:"18px",lg:"20px",xl:"22px",base:"14px"}} >Population : {el.population}</Typography>
            <Typography className={styles.text} fontSize={{sm: "16px",md:"18px",lg:"20px",xl:"22px",base:"14px"}} >Region : {el.region}</Typography>
            <Typography className={styles.text} fontSize={{sm: "16px",md:"18px",lg:"20px",xl:"22px",base:"14px"}} >Capital : {el.capital ? el.capital[0] : null}</Typography>

            <div>
      <Button onClick={handleOpen} style={{ border :"1px solid"}}>More Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">Native : {el.region}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> SubRegion : {el.subregion}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> Border-Coutries : {el.altSpellings[0]}, {el.altSpellings[1]} </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}> Languages : English , {el.subregion} </Typography> <br/> <br />
          <Button onClick={handleClose}>Close</Button>

        </Box>
      </Modal>
    </div>
    
          </Box>))}
       </Box>
    </>
  )
}

export default Country