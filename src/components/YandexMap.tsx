"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

const CENTER: [number, number] = [55.7532788, 37.5930115]
const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY

const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="16" fill="rgba(214,38,111,0.18)"/><circle cx="20" cy="20" r="9" fill="#d6266f" stroke="rgba(255,255,255,0.85)" stroke-width="2"/></svg>`
const MARKER_ICON = `data:image/svg+xml,${encodeURIComponent(MARKER_SVG)}`

declare global {
    interface Window {
        ymaps: any
    }
}

export const YandexMap = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scriptReady, setScriptReady] = useState(false)

    useEffect(() => {
        if (!scriptReady || !containerRef.current) return

        let map: any
        let cancelled = false

        window.ymaps.ready(() => {
            if (cancelled || !containerRef.current) return

            map = new window.ymaps.Map(containerRef.current, {
                center: CENTER,
                zoom: 16,
                controls: ["zoomControl"],
            })

            const placemark = new window.ymaps.Placemark(CENTER, {}, {
                iconLayout: "default#image",
                iconImageHref: MARKER_ICON,
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -20],
            })

            map.geoObjects.add(placemark)
        })

        return () => {
            cancelled = true
            map?.destroy?.()
        }
    }, [scriptReady])

    if (!API_KEY) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-2 p-6 text-center text-[13px] text-foreground-faint">
                Укажите NEXT_PUBLIC_YANDEX_MAPS_API_KEY в .env.local, чтобы отобразить карту
            </div>
        )
    }

    return (
        <>
            <Script
                src={`https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`}
                strategy="afterInteractive"
                onReady={() => setScriptReady(true)}
            />
            <div ref={containerRef} className="absolute inset-0" />
        </>
    )
}
