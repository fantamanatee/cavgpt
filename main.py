import pandas as pd
import numpy as np
import re

CORE_CLASSES = [
'102',
'121',
'181',
'221',
'222',
'312',
'313',
'314',
'315',
]

COLS = ['timestamp',
'email',
'class_year',
'fav_lang',
'102_difficulty', 
'102_grade',
'102_happiness',
'102_take_again',
'121_difficulty', 
'121_grade',
'121_happiness',
'121_take_again',
'181_difficulty', 
'181_grade',
'181_happiness',
'181_take_again',
'221_difficulty', 
'221_grade',
'221_happiness',
'221_take_again',
'222_difficulty', 
'222_grade',
'222_happiness',
'222_take_again',
'312_difficulty', 
'312_grade',
'312_happiness',
'312_take_again',
'313_difficulty', 
'313_grade',
'313_happiness',
'313_take_again',
'314_difficulty', 
'314_grade',
'314_happiness',
'314_take_again',
'315_difficulty', 
'315_grade',
'315_happiness',
'315_take_again',
'best_elec1',
'best_elec1_difficulty',
'best_elec1_grade',
'best_elec1_happiness',
'best_elec1_take_again',
'best_elec2',
'best_elec2_difficulty',
'best_elec2_grade',
'best_elec2_happiness',
'best_elec2_take_again',
'best_elec3',
'best_elec3_difficulty',
'best_elec3_grade',
'best_elec3_happiness',
'best_elec3_take_again',
'worst_elec1',
'worst_elec1_difficulty',
'worst_elec1_grade',
'worst_elec1_happiness',
'worst_elec1_take_again',
'worst_elec2',
'worst_elec2_difficulty',
'worst_elec2_grade',
'worst_elec2_happiness',
'worst_elec2_take_again',
'worst_elec3',
'worst_elec3_difficulty',
'worst_elec3_grade',
'worst_elec3_happiness',
'worst_elec3_take_again',
]


def refactor_df(data_raw):
    '''
    convert to student - course matrix 
    '''
    
    # get electives, cleanup messy input
    electives = list(set(data_raw[['best_elec1','best_elec2','best_elec3','worst_elec1','worst_elec2','worst_elec3']].values.flatten().tolist()))
    electives.remove(np.nan)
    pattern = re.compile(r'(\d{3})')
    electives = [re.findall(pattern, s)[0] if re.findall(pattern, s) else None for s in electives]
    electives = [e for e in electives if not e in CORE_CLASSES]

    classes = CORE_CLASSES + electives
    students = data_raw['email']

    # construct student_class matrix
    SC_matrix = 

    

if __name__ == '__main__':
    RAW_DATA_PATH = "data/CSCE Upper Electives Survey (Responses) - Form Responses 1.csv"
    print(f'synthesizing data from {RAW_DATA_PATH}')

    # FIXME redownload csv later
    data_raw = pd.read_csv(RAW_DATA_PATH)
    data_raw.columns = COLS

    refactor_df(data_raw)
    

    breakpoint()

