import requests
from bs4 import BeautifulSoup
import json

url = 'https://www.eventbrite.com/d/united-states--new-york/events/'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

event_cards = soup.select('.eds-event-card-content__primary-content')
events = []

for event_card in event_cards:
    event = {}
    detail_url = event_card.find('a')['href']
    detail_response = requests.get(detail_url)
    detail_soup = BeautifulSoup(detail_response.text, 'html.parser')

    img = event_card.find('img')
    event["thumbnail"] = img['src'] if img else None
    
    title = detail_soup.find('h1', class_='listing-hero-title')
    event["title"] = title.text.strip() if title else None

    date_time = detail_soup.find('div', class_='event-details__data')
    event["date_time"] = date_time.text.strip() if date_time else None

    location = detail_soup.find('div', class_='event-details__data', itemprop='address')
    event["location"] = location.text.strip() if location else None
    
    organizer = detail_soup.find('div', class_='event-details__data', itemprop='name')
    event["organizer"] = organizer.text.strip() if organizer else None

    description = detail_soup.find('div', class_='structured-content-rich-text')
    event["description"] = description.text.strip() if description else None

    price = detail_soup.find('div', class_='js-display-price')
    event["price"] = price.text.strip() if price else None

    events.append(event)

output = {"events": events}

# Save the scraped data to a JSON file
with open('event_data.json', 'w') as f:
    json.dump(output, f, indent=2)

print("Scraped event data saved to event_data.json")

