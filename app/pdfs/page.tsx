"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Pdfs = () => {
  const [pdfLinks, setPdfLinkes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await axios.get("http://localhost:5000/api/scrape-pdf");

      setPdfLinkes(response.data);
    };

    fetchLinks();
  }, []);

  const clearCookie = () => {
    Cookies.remove("token", { path: "/" });

    router.replace("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">PDF Links</h1>
        <button
          onClick={clearCookie}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>

      <ul className="list-disc space-y-2">
        {pdfLinks.map((link: string) => (
          <li key={link} className="flex items-center">
            <Link
              href={link}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {link.split("/").pop()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pdfs;
