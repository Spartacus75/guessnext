import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  //const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const data = props.data

/*  const handleChange = (event) => {
    setAge(event.target.value);
  };*/

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.value}
          onChange={props.onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((item, index)=> <MenuItem value={item.name} key={item.name}>{item.name} - {index+1}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
