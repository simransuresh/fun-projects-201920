import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Home() {
    useEffect(() => {
        fetchItem();
    }, []);

    const [info, setItem] = useState([]);

    const fetchItem = async () => {   
        const data = await fetch(`http://localhost:5500/flights`)
        const item = await data.json();
        
        setItem(item.flights);
        console.log(info);

    };
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Departure</TableCell>
            <TableCell align="right">Arrival</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((row) => (
            <TableRow key={row.source}>
              <TableCell component="th" scope="row">
                {row.source}
              </TableCell>
              <TableCell align="right">{row.destination}</TableCell>
              <TableCell align="right">{row.departure}</TableCell>
              <TableCell align="right">{row.arrival}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
        </div>
    );

}

export default Home;