
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "./EventsMap.css";


const json = {
    
        "events": [ {
            "id": 1,
            "user": "kitchenboys",
            "artform": "Music Group",
            "thumbnail": "https://imgur.com/8Ubpgfh.jpg",
            "title": "Kitchen Boys Live at Kind Regards",
            "artist": "Kitchen Boys",
            "location": {
                "street": "152 Ludlow Street",
                "street 2": "",
                "city" : "New York City",
                "state": "New York",
                "zip" : 10002,
                "neighborhood" : "Lower East Side"
            },
            "venue": "Kind Regards",
            "calendar": {
                "time": "10:00 PM EST",
                "date": "05/05/2023",
                "day": "Friday"
            },
            "price": "Free",
            "tickets": "No tickets, just pullUp!",
            "share": "share-link.com",
            "images": null,
            "description": "Yerrrrr! Get ready to party with the Kitchen Boys, the hardest meme rap group around! Come see us perform our latest hit single 'Tom Cruise' live. Get ready to laugh and dance alllllllll night long. We got catchy beats, hilarious lyrics, and memes on deck. The Kitchen Boys will cook up something special for you to remember. Bring your shorty, bring your friends, bring your pets, bring mom and dad. You're not going to want to miss this. Doors at 10pm, We'll be on at 11pm.",
            "age": "21+",
            "category": "Music",
            "subcategory": "Groups",
            "tags": ["meme rap", "rap", "hip-hop", "party"],
            "collaborators": ["prodclink", "typevlad"]
        },
    
        {
            "id": 2,
            "user": "sleepypharaoh",
            "artform": "Producer",
            "thumbnail": "https://imgur.com/Y3031kF.jpg",
            "title": "MC and Producer Tournament",
            "artist": "Sleepy Pharaoh",
            "location": {
                "street": "1114 Dekalb Ave",
                "street 2": "",
                "city": "Brooklyn",
                "state": "New York",
                "zip": 11221,
                "neighborhood": "Bushwick"
                } ,
            "venue": "Secret Pour",
            "calendar": {
                "time": "9:00 PM EST",
                "date": "05/06/2023",
                "day": "Saturday"
            },
            "price": "Free",
            "tickets": "ticket-link.com",
            "share": "share-link.com",
            "images": null,
            "description": "The Ultimate MC & Producer Tournament! Pull up for some friendly competition featuring some of the neighborhood's best rappers, producers, and artists. I'll be showcasing some of my latest beats and tracks. Doors are at 9pm. Expecting my set to run at 10pm. Excited to see y'all there!",
            "age": "18+",
            "category": "Music",
            "subcategory": "producers",
            "tags": ["rap", "hip-hop", "beats", "producers", "competitions"],
            "collaborators": null
    },
    {
        "id": 3,
        "user": "montanajanel",
        "artform" : ["Singer", "Songwriter"],
        "thumbnail": "https://imgur.com/DKVB3gv.jpg",
        "title": "Lucky Cat Record Club 1yr Anniversary Party",
        "artist": "Montana Janel",
        "location": {
            "street": "632 Manhattan Ave",
            "street 2": "",
            "city":  "Brooklyn",
            "state": "New York",
            "zip":  "11222",
            "neighborhood": "Greenpoint"
    
                } ,
        "venue": "Ponyboy",
        "calendar": {
            "time": "10:00 PM EST",
            "date": "04/28/2023",
            "day": "Friday"
        },
        "price": "$10",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": null,
        "description": "Hello, lovelies! Your fairy songstress, Montana, here! I am thrilled to be performing at Ponyboy for the 1-year anniversary of our beloved music collective, Lucky Cat Record Club! It's been an incredible year of music, friendship, and community, and I can't wait to dance and celebrate with all of you. This performance is a reflection of the beauty and magic that surrounds us, and I invite you to come and be transported to a world of dreamy melodies and good times. Let's raise a glass to how far we've come! Don't miss this celebration, get your tickets now!",
        "age": "21+",
        "category": "Music",
        "subcategory": "Singers",
        "tags": ["pop", "dance", "party"],
        "collaborators": null
    },
    
    {
        "id": 4,
        "user": "orson",
        "artform" : "DJ",
        "thumbnail": "https://imgur.com/wXzRoFI.jpg",
        "title": "#ARTSPACE Launch Party",
        "artist": "Orson",
        "location": {
            "street": "215 Chrystie Street",
            "street 2": "",
            "city": "New York City",
            "state": "New York",
            "zip": 10002,
            "neighborhood": "Lower East Side"
                } ,
        "venue": "PUBLIC Hotel",
        "calendar": {
            "time":"10:00 PM EST",
            "date": "04/29/2023",
            "day": "Saturday"
        },
        "price": "$15",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": null,
        "description": "Martinis shaken, not stirred. Disco beats by yours truly, and my fellow DJs Roger Sanchez and Love Club. Come be a part of the launh of Public Hotel's new #ARTSPACE, ignitng a night of glamour we call Disco is Forever. From live performances to screenings, theatre to nightlife, the unexpected is only just the beginning at our new multimedia #ARTSPACE. PULL UP!",
        "age": "21+",
        "category": "Music",
        "subcategory": "DJ",
        "tags": ["nightlife", "party", "pop", "disco", "techno"],
        "collaborators": ["rogersanchez", "loveclub"]
    },
    
    {
        "id": 5,
        "user": "jonryanisdead",
        "artform" : ["Director", "Writer"],
        "thumbnail": "https://imgur.com/Xp1H6vc.jpg",
        "title": "Full Time, Pre-Film Fest Screening",
        "artist": "Jon Ryan Sugimoto",
        "location": {
            "street": "167 Orchard Street",
            "street 2": "",
            "city": "New York City" ,
            "state": "New York",
            "zip": 10002,
            "neighborhood": "Lower East Side"
                } ,
        "venue": "The Slipper Room",
        "calendar": {
            "time": "7:00 PM EST",
            "date": "04/28/2023",
            "day": "Thursday"
        },
        "price": "Free",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": ["https://imgur.com/1k3goHE.jpg", "https://imgur.com/KjBcOmF.jpg", "https://imgur.com/RBbvES9.jpg"],
        "description": "All my New York City people, come check out the screening of my latest short film, 'Full Time', before we hit the Beverly Hills Film Fest later this month. Starring Andrew Lutheran and Iddo Goldberg, the film tells a modern-day parable. College graduation is over, and Michael (Andrew Lutheran) has his entire life before him. Flanked by his two best friends, Michael's first instinct is to go skateboarding in the park, but as the trio reflects on their future, a mysterious man (Iddo Goldberg) approaches and asks them if anyone wants to earn some easy cash... Come see how it all plays out! Can't wait to see you guys there!",
        "age": "All Ages",
        "category": "Film",
        "subcategory": "Screening",
        "tags": ["short film", "drama"],
        "collaborators": ["Andrew Lutheran", "Iddo Goldberg", "Ellen Burke", "Brenna Webb", "Jolie Gielchinsky"]
    },
    
    {
        "id": 6,
        "user": "officialsavsnow",
        "artform" : "Comedian",
        "thumbnail": "https://imgur.com/HoKHd8h.jpg",
        "title": "Pump Up: The Show",
        "artist": "Savannah Snow",
        "location": {
            "street": "167 Graham Ave",
            "street 2": "",
            "city": "Brooklyn" ,
            "state": "New York",
            "zip": 11206,
            "neighborhood": "East Williamsburg"
                } ,
        "venue": "Brooklyn Comedy Collective",
        "calendar": {
            "time": "8:30 PM EST",
            "date": "04/26/2023",
            "day": "Wednesday"
        },
        "price": "$10",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": ["https://imgur.com/pUeOGIA.jpg", "https://imgur.com/IeqQT4v.jpg", "https://imgur.com/gRVPOXc.jpg"],
        "description": "slide on me and this ~talented~ troupe of dumbass comedians. We'll take the stage and whip up a series of unscripted scenes and characters based solely on audience suggestions. You never know what kind of wacky situations we'll come up with, we sure don't, but we guarantee it will be side-splittingly funny. Our performances are fast-paced, interactive, and always unpredictable. Find yourself swept up in a musical number, caught in the middle of a bizarre love triangle, or watching a group of superheroes saving the world in the most ridiculous way possible. Grab your friends, grab your mom, your cat, bring a g-ddamn sense of humor, and get ready for a night you won't forget.",
        "age": "18+",
        "category": "Comedy",
        "subcategory": "shows",
        "tags": ["comedy", "women in comedy", "improv"],
        "collaborators": null
    },
    
    {
        "id": 7,
        "user": "natashanirvana",
        "artform" : ["Painter", "Visual Artist", "Digital Artist"],
        "thumbnail": "https://imgur.com/fFFS1d8.jpg",
        "title": "Catch me at Artists and Fleas!",
        "artist": "Natasha Bartley",
        "location": {
            "street": "70 N 7th Street",
            "street 2": "",
            "city": "Brooklyn" ,
            "state": "New York",
            "zip": 11249,
            "neighborhood": "Williamsburg"
    
                } ,
        "venue": "Artists and Fleas",
        "calendar": {
            "time": "11:00 AM EST",
            "date": "04/29/2023",
            "day": "Saturday"
        },
        "price": "Free",
        "tickets": "No tickets, just pullUp!",
        "share": "share-link.com",
        "images": ["https://imgur.com/6LBViWC.jpg", "https://imgur.com/dEvWGXG.jpg", "https://imgur.com/fsSX3Ah.jpg" ],
        "description": "Hey, guys! I'll be setting up shop at Artists and Fleas this Saturday from 11am-6pm. I specialize in oil paintingsm and I'll be unveiling my latest pieces, all framed and ready to go home with you! See my profile for more samples of my work and photos from past events. So excited to meet you guys! The weather's going to be amazing!" ,
        "age": "All Ages",
        "category": "Fine Art",
        "subcategory": "Painting & Drawing",
        "tags": ["oil painting", "visual arts", "markets", "booths"],
        "collaborators": null
    },
    
    {
        "id": 8,
        "user": "sariri",
        "artform" : "Fashion Designer",
        "thumbnail": "https://imgur.com/p8ELSHG.jpg",
        "title": "Rem&Ri's Femme Fatale Pop-Up",
        "artist": "Sarina",
        "location": {
            "street": "17 Meadow Street",
            "street 2": "",
            "city": "Brooklyn" ,
            "state": "New York",
            "zip": 11206,
            "neighborhood": "East Williamsburg"
                } ,
        "venue": "The Meadows",
        "calendar": {
            "time": "8:00 PM EST",
            "date": "05/06/2023",
            "day": "Saturday"
        },
        "price": "$15",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": ["https://imgur.com/VGLCV2l.jpg", "https://imgur.com/6K0yj0h.jpg", "https://imgur.com/KEMlNh1.jpg", "https://imgur.com/wCUyFxJ.jpg"],
        "description": "If I don't see you here tomorrow, you don't love me! Remi and I are emptying our closet! Designer, vintage,absolutely SICK finds on the racks! We'll be featuing other amazing WOMEN vendors, tattoos, drinks, and more! Live performances by DJs and Mellow Domingo! Come support your girlies!",
        "age": "21+",
        "category": "Fashion & Textiles",
        "subcategory": "Women's Clothing",
        "tags": ["womens fashion", "thrifting", "vintage"],
        "collaborators": ["Mellow Domino", "Remi", "Krysten Java", "Mars Bars"]
    },
    
    {
        "id": 9,
        "user": "teesndsneaks",
        "artform" : "Photographer",
        "thumbnail": "https://imgur.com/SXXLy1A.jpg",
        "title": "MADE WELL Gallery",
        "artist": "DeAndre Mitchells",
        "location": {
            "street": "95 Verona Street",
            "street 2": "",
            "city": "Brooklyn" ,
            "state": "New York",
            "zip": 11231,
            "neighborhood": "Red Hook"
                } ,
        "venue": "Mat Blak",
        "calendar": {
            "time": "2:00 PM EST",
            "date": "05/23/2023",
            "day": "Tuesday"
        },
        "price": "Free",
        "tickets": "No tickets, just pullUp!",
        "share": "share-link.com",
        "images": ["https://imgur.com/DWYjsNs.jpg", "https://imgur.com/MsmxofK.jpg" ],
        "description": "My first solo show is here! Come see photos by myself + an immersive sensory experience. Drinks, music and vibes available. I'm so excited for you guys to see what I've been working on. Save the date and slide thru!",
        "age": "All Ages",
        "category": "Photography",
        "subcategory": "Gallery",
        "tags": ["photography", "black & white", "mixed media", "gallery"],
        "collaborators": null
    },
    
    {
        "id": 10,
        "user": "thezummymohammed",
        "artform" : ["Dancer", "Singer", "Actor"],
        "thumbnail": "https://imgur.com/i59ejqT.jpg",
        "title": "Cinderella: The Musical",
        "artist": "Zummy Mohammed",
        "location": {
            "street": "214 W 42nd Street",
            "street 2": "",
            "city": "New York City" ,
            "state": "New York",
            "zip": 110036,
            "neighborhood": "Time's Square"
                } ,
        "venue": "New Amsterdam Theater",
        "calendar": {
            "time": "7:00 PM EST",
            "date": "04/27/2023",
            "day": "Thursday"
        },
        "price": "$82+",
        "tickets": "ticket-link.com",
        "share": "share-link.com",
        "images": ["https://imgur.com/KdtbmDB.jpg", "https://imgur.com/2MGQbfz.jpg"],
        "description": "Hey y'all! It's been WEEKS of working our butts off, and it's all about to pay off. I'm so excited to invite all my friends, family, and followers out to the production of Cinderella's opening weekend, which is kicking off this Thursday night. pullUP!",
        "age": "All Ages",
        "category": "Performing Arts",
        "subcategory": "Theater",
        "tags": ["musical", "singing", "dancing", "acting", "broadway"],
        "collaborators": null
    }]}

    const containerStyle = {
      width: '100%',
      height: '400px',
    };
    
    const center = {
      lat: 40.7128,
      lng: -74.0060,
    };
    
    function EventMap() {
      const [markers, setMarkers] = useState([]);
      const [map, setMap] = useState(null);
    
      useEffect(() => {
        const fetchLocations = async () => {
          if (!map) return;
          const geocoder = new window.google.maps.Geocoder();
    
          const locations = await Promise.all(
            json.events.map(async event => {
              const { street, city, state, zip } = event.location;
              const address = `${street}, ${city}, ${state} ${zip}`;
    
              return new Promise((resolve, reject) => {
                geocoder.geocode({ address }, (results, status) => {
                  if (status === 'OK') {
                    const position = {
                      lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng(),
                    };
                    resolve({ id: event.id, position });
                  } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`);
                    reject();
                  }
                });
              });
            })
          );
    
          setMarkers(locations);
          console.log("Fetched locations:", locations);
        };
    
        if (map) {
          fetchLocations();
        }
      }, [map]);
    
      const onMapLoad = (mapInstance) => {
        setMap(mapInstance);
      };
    
      return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onMapLoad}>
            {markers.map(marker => (
              <Marker key={marker.id} position={marker.position} className="event-marker" />
            ))}
          </GoogleMap>
        </LoadScript>
      );
    }
    
    export default EventMap;
    