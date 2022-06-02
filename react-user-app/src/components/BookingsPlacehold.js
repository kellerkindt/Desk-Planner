import React from "react";
import BookingCard from "./BookingCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import HttpService from "../services/HttpService";
import TopAppBar from "./TopAppBar";
import BottomNavBar from "./BottomNavBar";

class BookingsPlacehold extends React.Component{
  constructor(props) {
    super(props);
    this.state = {bookings: []};
  }
  componentDidMount() {
    HttpService.getBookings().then(res => {
      this.setState({ bookings: res });
    });
  }

  render() {
    return (
      <Container
        sx={{ marginTop: "64px", marginRight: "12px", marginBottom: "64px", bgcolor: "#f4f4f4" }}
      >
        <TopAppBar />
        <Grid container
          rowSpacing={4}
          sx={{ marginLeft: "12px", bgcolor: "#f4f4f4" }}
        >
          {this.state.bookings.map((bookings) => {
            // benötigte Parameter: Raum, Datum, Intervall
            return <BookingCard room="" date={bookings.bookingEnd} duration="{bookings.bookingEnd}-{bookings.bookingStart}"  
            onClick={() => {
              // ConfirmBox hier drunter
              HttpService.deleteBooking(bookings.id).then(res => {
                this.forceUpdate();
              });
            }
          }
          />;
        })}
        </Grid>
        <BottomNavBar />
      </Container>
    );
  };
};

export default BookingsPlacehold;
