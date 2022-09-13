import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import config from '../config.js'
const API_URL = 'https://www.googleapis.com/civicinfo/v2/'
const key = config.civics_api.KEY;

const MidtermInfo = () => {
  const [electionsList, setElectionsList] = useState([]);
  const [repsList, setRepsList] = useState([]);
  const [zipCode, setZipCode] = useState('');

  const handleInputChange = (event) => {
    const {value} = event.target;
    setZipCode(value);
  }

  const handleGetReps = (e) => {
    e.preventDefault();
    const zip = zipCode;
    axios.get(API_URL+`representatives?key=${key}&address=${zip}`).then(resp=>{
      const reps = resp.data.officials;
      setRepsList(reps);
    });
  }

  useEffect(()=> {
    axios.get(API_URL+`elections?key=${key}`).then(resp=>{
      const elections = resp.data.elections;
      setElectionsList(elections);
    });
  }, []);
  return(
    <div>
      <div className='electionsBox'>
        <Typography variant='h4'>Elections</Typography>
        <Grid container direction='row' justifyContent='left' alignItems='center'>
          <List>
            {electionsList.map((election) => 
              <ListItem key={election.id}>{election.name}</ListItem>
            )}
          </List>
        </Grid>
      </div>
      <div className='repsBox'>
        <Typography variant='h4'>Representatives</Typography>
        <label>ZIP CODE:</label>
        <input
          type='text'
          name='zip_code'
          onChange={handleInputChange}
        />
        <button onClick={handleGetReps}>See your Reps!</button>
        <div className='repsListBox'>
          <Grid container direction='row' justifyContent='left' alignItems='center'>
            <List>
              {repsList.map((rep) => 
                <>
                  <ListItem key={rep.id}><h4>{rep.name} - {rep.party} </h4></ListItem>
                </>
              )}  
            </List>    
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default MidtermInfo;