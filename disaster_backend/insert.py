from django.contrib.auth.models import User
from disaster_backend.core.models import Disaster
from random import choice, uniform

DISASTER_TYPES = [
    'Fire', 'Flood', 'Earthquake', 'Storm/Hurricane', 'Tornado',
    'Landslide', 'Tsunami', 'Volcanic Eruption', 'Drought', 'Other'
]
SEVERITY_LEVELS = ['Low', 'Moderate', 'High', 'Severe']

LOCATIONS = [
    # Ahmedabad
    ("CG Road, Navrangpura, Ahmedabad", "Fire outbreak in a commercial building due to short circuit."),
    ("Law Garden, Ahmedabad", "Flooding in the park area caused by heavy overnight rainfall."),
    ("Maninagar, Ahmedabad", "Earthquake tremors felt; minor cracks in residential buildings."),
    ("Paldi, Ahmedabad", "Severe fire in textile godown, firefighters on site."),
    ("Bopal, Ahmedabad", "Waterlogging in residential colonies after drainage overflow."),
    ("Satellite, Ahmedabad", "Storm damage with uprooted trees blocking main roads."),
    ("Prahladnagar, Ahmedabad", "High winds causing signboards to collapse near shopping area."),
    ("Ellis Bridge, Ahmedabad", "Bridge partially closed due to suspected structural damage after quake."),
    ("Naranpura, Ahmedabad", "Gas cylinder blast reported in a residential flat."),
    ("Chandkheda, Ahmedabad", "Flash flood warning after Sabarmati water level rise."),
    ("Vastrapur, Ahmedabad", "Fire in food court at popular mall; no casualties reported."),
    ("Isanpur, Ahmedabad", "Warehouse roof collapse after heavy rains."),
    ("Memnagar, Ahmedabad", "Minor landslide near under-construction site."),
    ("Thaltej, Ahmedabad", "High alert for possible flood due to dam water release."),
    ("Shahibaug, Ahmedabad", "Power outage after transformer fire in residential area."),
    ("Kankaria, Ahmedabad", "Storm damage to lakeside shops and stalls."),
    ("Vejalpur, Ahmedabad", "Flooding in low-lying streets; residents relocated temporarily."),
    ("Gota, Ahmedabad", "Severe dust storm reducing visibility on SG Highway."),
    ("Bapunagar, Ahmedabad", "Building wall collapse after overnight rain."),
    ("Sabarmati, Ahmedabad", "Riverbank erosion reported; authorities inspecting site."),
    ("Ambawadi, Ahmedabad", "Gas leak detected in industrial unit."),
    ("Naroda, Ahmedabad", "Small tornado sighted in industrial belt."),
    ("Jodhpur, Ahmedabad", "Water tank collapse damages nearby houses."),
    ("Anandnagar, Ahmedabad", "Flash flooding after intense 1-hour rainfall."),
    ("Nikol, Ahmedabad", "Lightning strike damages rooftop solar panels."),
    ("Odhav, Ahmedabad", "Chemical spill in manufacturing plant."),
    ("Ranip, Ahmedabad", "Electric pole collapse blocking main road."),
    ("Kalupur, Ahmedabad", "Railway underpass flooded, disrupting traffic."),
    ("Raipur, Ahmedabad", "Heavy rains cause partial collapse of old market roof."),
    ("Sarkhej, Ahmedabad", "Oil tanker overturned causing road closure."),
    ("Hansol, Ahmedabad", "Severe windstorm damages airport hangars."),
    ("Ghatlodia, Ahmedabad", "Local flooding affecting school premises."),
    ("Vishala, Ahmedabad", "Bridge approach road damaged after river overflow."),
    ("Motera, Ahmedabad", "Dust storm disrupts cricket stadium preparations."),
    ("Jamalpur, Ahmedabad", "Fire in crowded bazaar; evacuation underway."),
    ("Gomtipur, Ahmedabad", "Flash flood after nearby drain breach."),
    ("Meghaninagar, Ahmedabad", "Tree fall damages multiple parked vehicles."),
    ("Amraiwadi, Ahmedabad", "Factory fire causes toxic smoke in surrounding area."),
    ("Saraspur, Ahmedabad", "Heavy rain causes partial building collapse."),
    ("Rakhial, Ahmedabad", "Chemical factory explosion reported."),
    ("Vastral, Ahmedabad", "Roads submerged after 3 hours of continuous rain."),
    ("Shilaj, Ahmedabad", "Lightning strike injures two near farmland."),
    ("Science City, Ahmedabad", "Strong winds topple advertising hoardings."),
    ("Zundal, Ahmedabad", "Overhead power lines damaged during storm."),
    ("Chharodi, Ahmedabad", "Small landslide blocks rural access road."),
    ("Sanand, Ahmedabad", "Flood warning after industrial lake overflow."),
    ("Bareja, Ahmedabad", "Storm knocks down large trees on state highway."),

    # Vadodara
    ("Alkapuri, Vadodara", "Fire in high-rise office building; fire brigade on site."),
    ("Fatehgunj, Vadodara", "Flooding reported near railway crossing."),
    ("Gotri, Vadodara", "Severe dust storm damages rooftop solar panels."),
    ("Akota, Vadodara", "Lightning strike near residential area."),
    ("Waghodia Road, Vadodara", "Chemical leak from industrial warehouse."),
    ("Manjalpur, Vadodara", "Drainage overflow after heavy rainfall."),
    ("Sayajigunj, Vadodara", "Old building collapses in market area."),
    ("Nizampura, Vadodara", "Gas cylinder explosion injures two."),
    ("Karelibaug, Vadodara", "Flash flood warning issued after dam release."),
    ("Tarsali, Vadodara", "Road closure after bridge damage."),
    ("Makarpura, Vadodara", "Factory fire producing heavy black smoke."),
    ("Subhanpura, Vadodara", "Windstorm damages roadside stalls."),
    ("Ajwa Road, Vadodara", "Waterlogging causes traffic jams."),
    ("Chhani, Vadodara", "Small tornado damages farmland."),
    ("Harni, Vadodara", "Airport operations suspended due to low visibility."),
    ("Gorwa, Vadodara", "Transformer blast causes power outage."),
    ("Sama, Vadodara", "Tree fall damages car showroom glass front."),
    ("Kalali, Vadodara", "Riverbank breach floods nearby villages."),
    ("Vasna Road, Vadodara", "Flash flood submerges residential streets."),
    ("Sevasi, Vadodara", "Strong winds uproot roadside trees."),
    ("Ravpura, Vadodara", "Warehouse roof collapse during storm."),
    ("Akshar Chowk, Vadodara", "Severe thunderstorm damages public property."),
    ("Manekbag, Vadodara", "Minor earthquake felt across locality."),
    ("Parivar Chowkdi, Vadodara", "Chemical spill on main road."),
    ("Laxmipura, Vadodara", "Heavy rains cause traffic disruptions."),
    ("Bhailal Amin Road, Vadodara", "Dust storm halts outdoor construction."),
    ("Ellora Park, Vadodara", "Road signs knocked down by high winds."),
    ("Rajmahal Road, Vadodara", "Heritage building damaged after quake."),
    ("Shivrajpur, Vadodara", "Flood waters cut off rural access."),
    ("Tandalja, Vadodara", "Roadside landslide blocks lane."),
    ("Pani Gate, Vadodara", "Wall collapse injures pedestrians."),
    ("Mujmahuda, Vadodara", "Flooding inside school compound."),
    ("Koyali, Vadodara", "Gas leak forces factory evacuation."),
    ("Undera, Vadodara", "Windstorm causes hoarding collapse."),
    ("Sangam, Vadodara", "Drain blockage floods market."),
    ("Ranoli, Vadodara", "Oil spill on state highway."),
    ("Sama Savli Road, Vadodara", "Lightning damages mobile tower."),
    ("Ajwa Nimeta, Vadodara", "Flooded amusement park area."),
    ("Kalol, Vadodara", "Bridge approach washed away by river."),
    ("Bajwa, Vadodara", "Heavy winds damage bus stand."),
    ("Amit Nagar, Vadodara", "Transformer fire reported."),
    ("Por, Vadodara", "River flooding affects farmland."),
    ("Padra, Vadodara", "Road closure due to waterlogging."),
    ("Vemali, Vadodara", "Factory wall collapse after storm."),
    ("Bil, Vadodara", "Dust storm damages crops."),
    ("Atladara, Vadodara", "Flood waters enter ground floor houses."),
]


reporter = User.objects.first()

for address, description in LOCATIONS:
    disaster_type = choice(DISASTER_TYPES)
    severity = choice(SEVERITY_LEVELS)
    
    if "Ahmedabad" in address:
        lat = uniform(23.0, 23.1)
        lon = uniform(72.5, 72.7)
    else:
        lat = uniform(22.25, 22.35)
        lon = uniform(73.15, 73.25)
    
    Disaster.objects.create(
        type=disaster_type,
        severity_level=severity,
        description=description,
        latitude=lat,
        longitude=lon,
        address=address,
        reported_by=reporter,
        is_verified=False
    )

print("✅ Disasters inserted successfully.")
