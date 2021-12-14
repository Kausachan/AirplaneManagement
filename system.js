function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

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
    bookSeat(requiredSeats, classType){
        if(classType === 'ECO' && (this.ECO_seatsFilled + requiredSeats) <= this.ECO_capacity)
        {
            this.ECO_seatsFilled += requiredSeats
            return true
        } 
        else if(classType === 'BUS' && (this.BUS_seatsFilled + requiredSeats) <= this.BUS_capacity){
            this.BUS_seatsFilled += requiredSeats
            return true
        } 
        return false    
    }
}



class Airport{
    constructor(runway, location, flights){
        this.location = location
        this.runway = {}
        for(let i = 1; i <= runway ; i++){
            this.runway[i] = true
        }    
        this.flights = [...flights]
    }
}

const flight1 = new Airplane('chennai', 'bangalore', 'CH_BNG_1', 75, 25, (new Date()), (new Date('2022', '12', '14', '5', '0')))
const chennai_airport = new Airport(3, 'chennai', [flight1])
console.log('Rs. ' + flight1.invoice)


// payment{
//     flightPayment()
//     foodPayment()
// }

// passenger{
//     name,
//     source,
//     destination
// }

// flight extends payment{
//     source,
//     destination,
//     name,
//     capacity,
//     seatsFilled
// }

// airport extends payment{
//     flightList : [new flight],
//     location
// }

// new passenger(name, source, destination, requiredSeats)


