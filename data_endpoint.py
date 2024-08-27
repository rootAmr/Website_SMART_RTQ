import pandas as pd

def load_data(file_path):
    return pd.read_excel(file_path)

# Path to the Excel file
file_path = r'./data/Data_Warga17_FIX.xlsx'
df = load_data(file_path)