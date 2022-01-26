from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

testing = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]

vehicles = {"bikes":2, "cycle":3, "car":1, "boat":2}

@app.get("/vehicles", tags=["Vehicle"])
async def get_vehicle() -> dict:
    return vehicles



# Customer data
customer = [
    {
        "name": "Name",
        "email": "Email",
        "phone": "Contact number"
    }
]
# Customer get and post api endpoint

@app.get("/customers", tags=["customer"])
async def get_customers():
    return customer

@app.post("/cust", tags=["customer"])
async def add_customer(cust_data: dict) -> dict:
    
    customer.append(cust_data)
    return {
        "data": { "Customer added." }
    }