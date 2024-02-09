# CarCar
CarCar is a car dealership application -- making it easier to manage inventory, services, and sales. 

Team:

* Person 1 - Tim McCormack, Automobile Service
* Person 2 - Which microservice?

## Design

![diagram](DDDDiagram.png)

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice has three models and one Value Object (VO): Salesperson, Customer, Sale, and AutomobileVO. 

For the sales model, foreign keys were created for AutomobileVO, Salesperson, and Customer because it required the data from those models/VOs. 

## Instructions to Run

1. Fork the Repo
2. Clone the Repo
3. Run the following code in the terminal:
    - `docker volume create beta-data`
    - `docker-compose build`
    - `docker-compose up`
4. Verify that each Docker container is running.
5. View the app @ http://localhost:3000/

### URL Endpoints/Samples

In the following images, the relevant URL, endpoint, HTTP method, and request/response bodies are visible. The order will be GET, POST, PUT, and DELETE.



## Sales

### List Salespeople

### List Salespeople
![salespeople](listSalespeople.png)

### Create a Saleperson
![salesperson](createSalesperson.png)

### Delete a Salesperson
![deletesalesperson](deleteSalesperson.png)

### List Customers
![listCustomers](listCustomers.png)

### Create a Customer
![createCustomer](createCustomer.png)

### Delete a Customer
![deleteCustomer](deleteCustomer.png)

The Sales Model is used with foreign keys: `automobile`, `salesperson`, and `customer` are used.

