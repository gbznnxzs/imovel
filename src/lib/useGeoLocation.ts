"use client";

import { useState, useEffect } from "react";

export interface GeoLocation {
    country: string;
    country_code: string;
    city: string;
    currency: string;
    region: "PT" | "BR" | "US" | "ME" | "GLOBAL";
}

export function useGeoLocation() {
    const [geo, setGeo] = useState<GeoLocation>({
        country: "Portugal",
        country_code: "PT",
        city: "Lisboa",
        currency: "EUR",
        region: "PT"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function detect() {
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();

                let region: GeoLocation["region"] = "GLOBAL";
                if (data.country_code === "PT") region = "PT";
                else if (data.country_code === "BR") region = "BR";
                else if (data.country_code === "US") region = "US";
                else if (["AE", "QA", "SA"].includes(data.country_code)) region = "ME";

                setGeo({
                    country: data.country_name || "Portugal",
                    country_code: data.country_code || "PT",
                    city: data.city || "Lisboa",
                    currency: data.currency || "EUR",
                    region
                });
            } catch (error) {
                console.error("Geo-detection failed:", error);
            } finally {
                setLoading(false);
            }
        }
        detect();
    }, []);

    return { geo, loading };
}
