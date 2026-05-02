import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

fake["label"] = 0
real["label"] = 1

fake["content"] = fake["title"] + " " + fake["text"]
real["content"] = real["title"] + " " + real["text"]

data = pd.concat([fake, real]).sample(frac=1, random_state=42)

X = data["content"].astype(str)
y = data["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

tokenizer = Tokenizer(num_words=10000)
tokenizer.fit_on_texts(X_train)

X_train = pad_sequences(tokenizer.texts_to_sequences(X_train), maxlen=300)
X_test = pad_sequences(tokenizer.texts_to_sequences(X_test), maxlen=300)

model = Sequential()
model.add(Embedding(10000, 128))
model.add(LSTM(64))
model.add(Dropout(0.3))
model.add(Dense(1, activation="sigmoid"))

model.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])

model.fit(X_train, y_train, epochs=3, batch_size=64, validation_data=(X_test, y_test))

model.save("lstm.h5")
joblib.dump(tokenizer, "tokenizer.pkl")

print("LSTM saved ✅")