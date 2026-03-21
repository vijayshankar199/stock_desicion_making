from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import google.generativeai as genai
import datetime
import pyjokes
import requests
import json
import os
import re
from sambanova import SambaNova

WEATHER_API_KEY = "e5a477fe377156d570abf3d52d33a0ea"
api_key="d87cce1e-2444-44b6-bd99-d6718fefcb8b", 

base_url = "http://api.openweathermap.org/data/2.5/weather"




@csrf_exempt
def chatbotdata(request):

    # -------- GET --------
    if request.method == "GET":
        return JsonResponse({"message": "Chatbot API is running"})

    # -------- POST --------
    if request.method == "POST":

        body = json.loads(request.body)
        user_input = body.get("message", "").lower()
        print("input_user" ,user_input)

       

        def chatbot(user_input):
            try:
                print("Trying to connect to Samba...")

                client = SambaNova(
                    api_key="d87cce1e-2444-44b6-bd99-d6718fefcb8b", 
                    base_url="https://api.sambanova.ai/v1",
                )

                response = client.chat.completions.create(
                    model="DeepSeek-R1-0528",
                    messages=[
                        {"role": "user", "content": user_input}
                    ]
                )

                print("Success response received")
                reply = response.choices[0].message.content
                # Remove <think>...</think> block completely
                reply = re.sub(r"<think>.*?</think>", "", reply, flags=re.DOTALL)

                reply = reply.strip()

                return reply
            except Exception as e:
                print("FULL ERROR:", repr(e))
                return "Connection failed."

        def cur_time():
            time = datetime.datetime.now().strftime("%I:%M %p")
            return f"Current time: {time}"

        def today_date():
            date = datetime.date.today()
            return f"Today date is {date}"

        def joke():
            return f"The Joke is: {pyjokes.get_joke()}"

        def weather(city):
            params = {
                "q": city,
                "appid": WEATHER_API_KEY,
                "units": "metric"
            }

            try:
                response = requests.get(base_url, params=params, timeout=10)
                response.raise_for_status()
                data = response.json()

                return (
                    f"Weather in {data['name']} is {data['weather'][0]['description']}. "
                    f"Temperature: {data['main']['temp']}°C, "
                    f"Humidity: {data['main']['humidity']}%"
                )

            except requests.exceptions.RequestException as e:
                return f"Weather error: {str(e)}"


        if "time" in user_input:
            reply = cur_time()

        elif "date" in user_input:
            reply = today_date()

        elif "joke" in user_input:
            reply = joke()

        elif "weather" in user_input:
            city = user_input.replace("weather", "").strip()
            if not city:
                reply = "Please specify a city."
            else:
                reply = weather(city)
        elif "bye" in user_input or "see you later" in user_input:
            reply="Have a good Day Byee...!"

        else:
            reply = chatbot(user_input)

        return JsonResponse({"reply": reply})

    return JsonResponse({"error": "Method not allowed"})