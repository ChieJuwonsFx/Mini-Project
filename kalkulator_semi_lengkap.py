import tkinter as tk

class kalkulator:
    def __init__(self, root):
        self.root = root
        self.root.title("Kalkulator Sederhana")

        # Membuat widget Entry untuk input dan menempatkannya di jendela utama
        self.entry = tk.Entry(root, width=30, font=('Arial', 18), borderwidth=2, relief="ridge", justify="right")
        self.entry.grid(row=0, column=0, columnspan=5, padx=10, pady=10)

        # Daftar tombol dengan teks dan posisi grid
        tombol = [
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3), ('C', 1, 4),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3), ('<-', 2, 4),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3), ('(', 3, 4),
            ('0', 4, 0), ('.', 4, 1), ('=', 4, 2), ('+', 4, 3), (')', 4, 4)
        ]

        # Membuat dan menempatkan tombol-tombol dalam grid
        for (inputan, baris, kolom) in tombol:
            button = tk.Button(root, text=inputan, width=5, height=2, font=('Arial', 18),
                               command=lambda t=inputan: self.on_button_click(t))
            button.grid(row=baris, column=kolom, padx=5, pady=5)

    def on_button_click(self, inputan):
        if inputan == '=':
            try:
                hasil = eval(self.entry.get())
                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, str(hasil))
            except Exception as e:
                self.entry.delete(0, tk.END)
                self.entry.insert(tk.END, "Error")
        elif inputan == 'C':
            self.entry.delete(0, tk.END)
        elif inputan == '<-':
            current_inputan = self.entry.get()
            new_inputan = current_inputan[:-1]
            self.entry.delete(0, tk.END)
            self.entry.insert(tk.END, new_inputan)
        else:
            self.entry.insert(tk.END, inputan)

# Membuat jendela utama (root window)
root = tk.Tk()
app = kalkulator(root)

# Menjalankan loop utama aplikasi
root.mainloop()
