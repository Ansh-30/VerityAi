import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

print("Loading dataset...")

fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

# Labels
fake["label"] = 0   # Fake
real["label"] = 1   # Real

# Merge text
fake["content"] = fake["title"].fillna("") + " " + fake["text"].fillna("")
real["content"] = real["title"].fillna("") + " " + real["text"].fillna("")

# Combine
data = pd.concat([fake, real], axis=0)
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

X = data["content"]
y = data["label"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Vectorizer
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_df=0.7,
    min_df=2,
    ngram_range=(1,2)
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model
model = LogisticRegression(
    max_iter=3000,
    C=2.0,
    solver="liblinear"
)

print("Training model...")
model.fit(X_train_vec, y_train)

# Evaluate
pred = model.predict(X_test_vec)
acc = accuracy_score(y_test, pred)

print(f"Accuracy: {acc:.4f}")
print(classification_report(y_test, pred))

# Save
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("Saved model.pkl and vectorizer.pkl ✅")