// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from "./Vehicle.js";
import Motorbike from "./Motorbike.js";
import Car from "./Car.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

// The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  // Declare properties of the Truck class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // Create a constructor that accepts the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number,
  ) {
    // Call the constructor of the parent class, Vehicle
    super();

    // Initialize the properties of the Truck class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels;
    this.towingCapacity = towingCapacity;

    // Check if the wheels array has 4 elements
    // If not, create 4 new Wheel objects
    if (wheels.length !== 4) {
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // Get the make an model of the vehicle if it exists
    // Check if the vehicle's weight is less than or equal to the truck's towing capacity
    // If it is, log that the vehicle is being towed
    // If it is not, log that the vehicle is too heavy to be towed
    if (this.weight <= this.towingCapacity) {
      console.log(`${vehicle.make} ${vehicle.model} is being towed`);
    } else {
      console.log(`${vehicle.make} ${vehicle.model} is too heavy to be towed`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // The method should call the printDetails method of the parent class
    super.printDetails();

    // The method should log the details of the Truck
    console.log(`VIN: ${this.vin}`);
    console.log(`color: ${this.color}`);
    console.log(`make: ${this.make}`);
    console.log(`model: ${this.model}`);
    console.log(`year: ${this.year}`);
    console.log(`weight: ${this.weight} lbs`);
    console.log(`top speed: ${this.topSpeed} mph`);
    console.log(`wheels: ${this.wheels.length}`);
    console.log(`towing capacity: ${this.towingCapacity} lbs`);

    // Print details of the wheels
    console.log(
      `Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`,
    );
    console.log(
      `Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`,
    );
    console.log(
      `Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`,
    );
    console.log(
      `Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`,
    );
  }
}

// Export the Truck class as the default export
export default Truck;
