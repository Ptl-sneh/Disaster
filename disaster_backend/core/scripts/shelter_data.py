import pandas as pd
import random
import os


def generate_data(row_num):
    data = []
    for _ in range(row_num):
        capacity = random.randint(50,1000)
        current_occupancy = random.randint(30,capacity)
        
        food_needed = current_occupancy * random.randint(2,6)
        water_required = current_occupancy * random.randint(8,15)
        medical_kits = max(1,current_occupancy // random.randint(10,28))
        volunteers_required = max(2, current_occupancy // random.randint(15, 38))
        
        data.append({
            'capacity' : capacity,
            'current_occupancy' : current_occupancy,
            'food_needed' : food_needed,
            'water_required' : water_required,
            'medical_kits' : medical_kits,
            'volunteers_required' : volunteers_required
        })
    return pd.DataFrame(data)

shelter_df = generate_data(10000)

script_dir = os.path.dirname(os.path.abspath(__file__))

csv_path = os.path.join(script_dir,'Shelter_Resources_Prediction.csv')

shelter_df.to_csv(csv_path,index = False)

print('CSV created and saved')