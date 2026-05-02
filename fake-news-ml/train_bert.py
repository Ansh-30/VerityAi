import pandas as pd
from datasets import Dataset
from transformers import BertTokenizer, BertForSequenceClassification
from transformers import Trainer, TrainingArguments

fake = pd.read_csv("Fake.csv")
real = pd.read_csv("True.csv")

fake["label"] = 0
real["label"] = 1

fake["text"] = fake["title"] + " " + fake["text"]
real["text"] = real["title"] + " " + real["text"]

data = pd.concat([fake, real]).sample(frac=1)

data = data[["text", "label"]]

dataset = Dataset.from_pandas(data)

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

def tokenize(example):
    return tokenizer(example["text"], padding="max_length", truncation=True)

dataset = dataset.map(tokenize, batched=True)

model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=2
)

args = TrainingArguments(
    output_dir="./bert_model",
    num_train_epochs=1,
    per_device_train_batch_size=8
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=dataset
)

trainer.train()

model.save_pretrained("./bert_model")
tokenizer.save_pretrained("./bert_model")

print("BERT saved ✅")