import tkinter as tk

class kalkulator:
    def __init__(self, root):
        self.root = root
        self.root.title("Kalkulator Sederhana")

        self.entry = tk.Entry(root, width=20, font=('Arial', 18))
        self.entry.grid(row=0, column=0, columnspan=4, padx=10, pady=10)

        buttons = [
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
            ('0', 4, 0), ('.', 4, 1), ('=', 4, 2), ('+', 4, 3)
        ]

        for (inputan, baris, kolom) in buttons:
            button = tk.Button(root, text=inputan, width=5, height=2, font=('Arial', 18),
                               command=lambda t=inputan: self.on_button_click(t))
            button.grid(row=baris, column=kolom, padx=5, pady=5)

    def on_button_click(self, inputan):
        if inputan == '=':
            try:
                result = eval(self.entry.get())
                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, str(result))
            except Exception as e:
                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, "Error")
        else:
            self.entry.insert(tk.END, inputan)

root = tk.Tk()
app = kalkulator(root)

root.mainloop()



