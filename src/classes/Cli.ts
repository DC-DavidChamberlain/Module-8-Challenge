// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// defined the Cli class
class Cli {
  // updated the vehicles property to accept Truck and Motorbike objects as well
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // updated the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          // updated the choices array to include Truck and Motorbike
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          // create a car
          this.createCar();
        }
        //added statements to create a truck or motorbike if the user selects the respective vehicle type
        else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity",
        },
      ])
      .then((answers) => {
        // used the answers object to pass the required properties to the Truck constructor
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity),
        );
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: "input",
          name: "make",
          message: "Enter Make",
        },
        {
          type: "input",
          name: "color",
          message: "Enter Color",
        },
        {
          type: "input",
          name: "model",
          message: "Enter Model",
        },
        {
          type: "input",
          name: "year",
          message: "Enter Year",
        },
        {
          type: "input",
          name: "weight",
          message: "Enter Weight",
        },
        {
          type: "input",
          name: "topSpeed",
          message: "Enter Top Speed",
        },
        {
          type: "input",
          name: "frontWheelDiameter",
          message: "Enter Front Wheel Diameter",
        },
        {
          type: "input",
          name: "frontWheelBrand",
          message: "Enter Front Wheel Brand",
        },
        {
          type: "input",
          name: "rearWheelDiameter",
          message: "Enter Rear Wheel Diameter",
        },
        {
          type: "input",
          name: "rearWheelBrand",
          message: "Enter Rear Wheel Brand",
        },
      ])
      .then((answers) => {
        // used the answers object to pass the required properties to the Motorbike constructor
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(
              parseInt(answers.frontWheelDiameter),
              answers.frontWheelBrand,
            ),
            new Wheel(
              parseInt(answers.rearWheelDiameter),
              answers.rearWheelBrand,
            ),
          ],
        );
        // push the motorbike to the vehicles array
        this.vehicles.push(motorbike);
        // set the selectedVehicleVin to the vin of the motorbike
        this.selectedVehicleVin = motorbike.vin;
        // perform actions on the motorbike
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  // added a parameter to accept a truck object
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // Find the selected vehicle
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow,
        );

        // Check if the selected vehicle is undefined
        if (!selectedVehicle) {
          console.log("Selected vehicle not found.");
          this.performActions();
          return;
        }

        // Check if the selected vehicle is the truck itself
        if (selectedVehicle.vin === truck.vin) {
          console.log("The truck cannot tow itself.");
          this.performActions();
        } else {
          // Tow the selected vehicle
          console.log("Towing the selected vehicle...");
          truck.tow(selectedVehicle);
          this.performActions();
        }
      });
  }

  performWheelie = (motorbike: Motorbike): void => {
    motorbike.wheelie();
    this.performActions();
  };

  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin,
    );

    if (!selectedVehicle) {
      console.log("Selected vehicle not found.");
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            // added options to tow and perform a wheelie
            "Tow",
            "Wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === "Print details") {
          selectedVehicle.printDetails();
        } else if (answers.action === "Start vehicle") {
          selectedVehicle.start();
        } else if (answers.action === "Accelerate 5 MPH") {
          selectedVehicle.accelerate(5);
        } else if (answers.action === "Decelerate 5 MPH") {
          selectedVehicle.decelerate(5);
        } else if (answers.action === "Stop vehicle") {
          selectedVehicle.stop();
        } else if (answers.action === "Turn right") {
          selectedVehicle.turn("right");
        } else if (answers.action === "Turn left") {
          selectedVehicle.turn("left");
        } else if (answers.action === "Reverse") {
          selectedVehicle.reverse();
        } else if (answers.action === "Tow") {
          if (selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
            return; // Return to avoid instantly calling performActions again
          } else {
            console.log("Only trucks can tow other vehicles.");
          }
        } else if (answers.action === "Wheelie") {
          if (selectedVehicle instanceof Motorbike) {
            this.performWheelie(selectedVehicle);
          } else {
            console.log("Only motorbikes can perform a wheelie.");
          }
        } else if (answers.action === "Select or create another vehicle") {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
