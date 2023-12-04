# Cav's Course Recommender

Visit the [Demo](https://cavgpt.vercel.app/) to explore our online website. The [Backend](https://fool1280.pythonanywhere.com/) is hosted on Python Anywhere.

You can access the website using the above link. To run the website locally, follow these instructions:

## Backend Setup:
1. **Create and Activate a Virtual Environment**:
   - To create a virtual environment, execute: `python -m venv venv`
   - To activate the virtual environment:
     - On Windows: `.\venv\Scripts\activate`
     - On macOS/Linux: `source venv/bin/activate`

2. **Install Required Python Packages**:
   - Execute: `pip install -r requirements.txt`

3. **Start the Backend**:
   - Execute: `python main.py`

## Frontend Setup

Follow these steps to start the app:
1. Navigate to the directory `frontend/main`.
2. Execute `pnpm i` to install the necessary dependencies.
3. Execute `pnpm run dev` to initiate the app.
4. Modify the line [here](https://github.com/fool1280/cavgpt/blob/7cb3b68c1bbe1479e221b8f7d9549b411cf69214/frontend/main/app/course/page.tsx#L54) to `localhost:5000`.
5. Access `localhost:5000` in your browser to use the web app.
