import { FC } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center p-8 bg-gray-100 text-gray-700 gap-4">
      <div className="flex items-center gap-4">
        <span className="font-semibold">Get in touch</span>
        <Linkedin className="w-5 h-5 hover:text-blue-600" />
        <Github className="w-5 h-5 hover:text-black" />
        <Mail className="w-5 h-5 hover:text-red-500" />
      </div>
      <div>
        <a href="/" className="underline hover:text-black">Home page</a>
      </div>
    </footer>
  );
};

export default Footer;