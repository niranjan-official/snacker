# SNACKER 🍫

**SNACKER** is an innovative vending machine system that seamlessly integrates hardware and software. This system allows users to select, order, and purchase snacks via a dedicated web app, generating a unique QR code for each order, which can be scanned at the vending unit.

## Features ⚙️

- **Wallet-Based System**: Streamlines transactions for frequent users. 💸
- **QR Code Integration**: Each order generates a unique QR code for easy vending. 📲
- **Seamless Communication**: Smooth interaction between the Raspberry Pi and the web app through a shared database. 🤝
- **Progressive Web App (PWA)**: Ensures the app is accessible and performs well on all devices. 📱

## Tech Stack 🛠️

- **Frontend**:
  - ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
  - ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  - ![ShadCN](https://img.shields.io/badge/ShadCN-007ACC?style=flat)
  - ![Zustand](https://img.shields.io/badge/Zustand-FF8C00?style=flat&logo=zustand&logoColor=white) 
  
- **Backend**:
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) 
  - ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) 
  
- **Database**:
  - ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white) 
  
- **Authentication**:
  - ![Clerk](https://img.shields.io/badge/Clerk-004AAD?style=flat&logo=clerk&logoColor=white) 
  
- **Payments**:
  - ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay&logoColor=white)
  
- **Testing**:
  - ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)
  
- **Hosting**:
  - ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) 
  
## How It Works 🚀

1. **Order & Payment**: Users select and order snacks via the web app, paying through the wallet system.
2. **QR Code Generation**: A unique QR code is generated for each order.
3. **Vending**: Users scan the QR code at the vending machine to retrieve their items.
4. **Smooth Operation**: The Raspberry Pi, connected to the vending unit, communicates with the web app via Firebase.

## Setup & Installation 🛠️

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/SNACKER.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up external services**:
   - Set up your own **Razorpay**, **Clerk**, and **Firebase** accounts.
   - Use the environment variables shown in the `.env.local.sample` file.
   - Replace the placeholder values in `.env.local.sample` with your actual account values and rename the file to `.env.local`.

4. **Run the app**:
    ```bash
    npm run dev
    ```

## Team & Acknowledgements 🙌

This project was made possible through the dedication and hard work of a 10-member team, along with the invaluable support of our faculty advisors. 

## License 📄

This project is licensed under the MIT License.

## Contact 📧

For any queries or contributions, feel free to reach out through the GitHub issues or contact us at **your-email@example.com**.
