import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { AppContext } from 'context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from 'store/hotelsSlice';
import { DeleteButton } from '../mui/DeleteButton';
import "./dialogs.scss";

const ChooseHotelDialog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {openChooseHotelDialog,handleCloseChooseHotelDialog ,hotelIndex,handleAddHotel,handleHotelClear} = useContext(AppContext)
  const [selectedHotel, setSelectedHotel] = useState(null);
  const dispatch = useDispatch()
  const {hotels} = useSelector((state)=>state.hotels)

  useEffect(()=>{
    dispatch(getHotels({search:""}))
  },[dispatch])


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    dispatch(getHotels({search:event.target.value}))
  };


  const handleHotelSelect = (hotel) => {
    handleCloseChooseHotelDialog()
    setSelectedHotel(hotel);
    handleAddHotel(hotel,hotelIndex)
  };

  const handleClear =()=>{
    handleCloseChooseHotelDialog()
    setSelectedHotel(null)
    handleHotelClear(hotelIndex)
  }

  return (
    <Dialog open={openChooseHotelDialog} onClose={handleCloseChooseHotelDialog}>
      <DialogTitle>Choose a Hotel</DialogTitle>
      <DialogContent>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <List>
          {hotels.map((hotel) => (
            <ListItem
              key={hotel._id}
              onClick={() => handleHotelSelect(hotel)}
            >
              <RadioGroup value={selectedHotel ? selectedHotel._id : ""} onChange={()=>{}}>
                <FormControlLabel
                  value={hotel._id}
                  control={<Radio />}
                  label={hotel.name}
                />
              </RadioGroup>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={handleClear}>Clear</DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseHotelDialog;
