import uvicorn
from main import app, HOST, PORT

if __name__=="__main__":
    uvicorn.run(app, host=HOST, port=PORT, reload=True)