
// utility functions

function msToTime(duration){
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

// entities and modules  

class Payment{
    constructor(){
        this.travel = {
            chennai : 1,
            bangalore : 2,
            kolkata : 3,
            delhi : 4,
            punjab : 5,
            kerala : 6,
            mumbai : 7,
            rajasthan : 8
        }
    }
    flightPayment(source, destination, flightDuration){
        return Math.abs(this.travel[source] - this.travel[destination]) * flightDuration * 1000
    }
    foodPayment(){
        // pass
    }
}

class Airplane extends Payment{
    constructor(source, destination, id, ECO_capacity, BUS_capacity, departTime, arriveTime){
        super();
        this.source = source
        this.destination = destination
        this.id = id
        this.ECO_capacity = ECO_capacity
        this.BUS_capacity = BUS_capacity
        this.ECO_seatsFilled = 0
        this.BUS_seatsFilled = 0
        this.departTime = departTime
        this.arriveTime = arriveTime
        this.flightDuration = Number.parseInt(msToTime(Math.abs(departTime - arriveTime)))
        this.invoice = this.flightPayment(source, destination, this.flightDuration)
    }
}

class Airport{
    constructor(runway, location, flights){
        this.location = location
        this.runway = {}
        for(let i = 1; i <= runway ; i++){
            this.runway[i] = true
        }    
        this.flights = JSON.parse(JSON.stringify(flights))
    }
}

// flight creation

const CH_bangalore_flight1 = new Airplane('chennai', 'bangalore', 'CH_BNG_1', 75, 25, (new Date()), (new Date('2022', '12', '14', '5', '0')))
const BNG_chennai_flight1 = new Airplane('bangalore', 'chennai', 'BNG_CH_1', 75, 25, (new Date()), (new Date('2022', '12', '14', '6', '15')))
const CH_delhi_flight1 = new Airplane('chennai', 'delhi', 'CH_DEL_1', 75, 25, (new Date()), (new Date('2022', '12', '14', '6', '15')))

// airport creation

const chennai_airport = new Airport(1, 'chennai', [
    {
        bangalore : [CH_bangalore_flight1]
    },
    {
        delhi : [CH_delhi_flight1]
    }
])
const bangalore_airport = new Airport(2, 'bangalore', [BNG_chennai_flight1])

// airports list

const airport_list = {
    chennai : chennai_airport, 
    bangalore : bangalore_airport
}

class Passenger{
    constructor(name){
        this.name = name
        this.ticket = false
    }
    bookTicket(source, destination, classType, requiredSeats){
        const airport = airport_list[source]
        let flight = null
        let flight_list = airport.flights
        for(let i = 0 ; i < flight_list.length ; i++){
            if(flight_list[i][destination]){
                flight_list = flight_list[i][destination]
                break
            }
        }
        if(classType === 'ECO')
        {
            for(let i = 0 ; i < flight_list.length ; i++){  // Assigning flight to the passenger
                if(flight_list[i].ECO_capacity >= (flight_list[i].ECO_seatsFilled + requiredSeats)){
                    flight = flight_list[i]         
                    this.ticket = true  
                    return ('Rs. ' + flight.invoice)
                }
            }
        }
        else{
            for(let i = 0 ; i < flight_list ; i++){
                if((flight_list[i].BUS_capacity >= (flight_list[i].BUS_seatsFilled + requiredSeats))){
                    flight = flight_list[i]
                    this.ticket = true
                    return ('Rs. ' + flight.invoice)
                }
            }
        }
        return 'No Tickets Available'
    }
    fly(from){
        const airport = airport_list[from]
        if(this.ticket === true){
            for(let i in airport.runway){
                if(airport.runway[i] === true){
                    airport.runway[i] = false 
                    setTimeout(() => console.log("You're flying"), 2000) 
                    return
                }
            }
            console.log(() => console.log('No runways available'), 2000) 
            return 
        }
        else console.log('Cannot fly without a ticket')
    }
}

// passengers

const passenger1 = new Passenger('kaushik')
console.log(passenger1.bookTicket('chennai', 'bangalore', 'ECO', 3))
console.log('Ticket successful')
const passenger3 = new Passenger('nobita')
console.log(passenger3.bookTicket('chennai', 'delhi', 'ECO', 6))
console.log('Ticket successful')
passenger3.fly('chennai')