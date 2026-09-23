
-- 1. Escribe una consulta que recupere los Vuelos (flights) y su identificador
-- que figuren con status On Time.


SELECT flight_id, route_no, status
FROM bookings.flights
WHERE status = 'On Time';


-- 2. Escribe una consulta que extraiga todas las columnas de la tabla bookings
-- y refleje todas las reservas que han supuesto una cantidad total mayor a 1.000.000.


SELECT *
FROM bookings.bookings
WHERE total_amount > 1000000;


-- 3. Escribe una consulta que extraiga todas las columnas de los datos
-- de los modelos de aviones disponibles (aircrafts_data).


SELECT *
FROM bookings.airplanes_data;


-- 4. Con el resultado anterior visualizado previamente, escribe una consulta
-- que extraiga los identificadores de vuelo que han volado con un Boeing 737.
-- (Código Modelo Avión = 733)


SELECT f.flight_id, f.route_no, r.airplane_code
FROM bookings.flights f
JOIN bookings.routes r ON f.route_no = r.route_no
WHERE r.airplane_code = '733';

-- 5. Escribe una consulta que te muestre la información detallada de los tickets
-- que han comprado las personas que se llaman Irina.
SELECT *


FROM bookings.tickets
WHERE passenger_name ILIKE '%IRINA%';


-- 6. Mostrar las ciudades con más de un aeropuerto.
-- Nota: Usamos city->>'en' para extraer el nombre en formato texto si city es campo JSONB


SELECT city->>'en' AS ciudad, COUNT(*) AS total_aeropuertos
FROM bookings.airports_data
GROUP BY city->>'en'
HAVING COUNT(*) > 1;

-- 7. Mostrar el número de vuelos por modelo de avión.


SELECT r.airplane_code, COUNT(f.flight_id) AS total_vuelos
FROM bookings.flights f
JOIN bookings.routes r ON f.route_no = r.route_no
GROUP BY r.airplane_code
ORDER BY total_vuelos DESC;

-- 8. Reservas con más de un billete (varios pasajeros).


SELECT book_ref, COUNT(*) AS total_pasajeros
FROM bookings.tickets
GROUP BY book_ref
HAVING COUNT(*) > 1;


-- 9. Vuelos con retraso de salida superior a una hora.


SELECT flight_id, route_no, scheduled_departure, actual_departure,
       (actual_departure - scheduled_departure) AS retraso
FROM bookings.flights
WHERE actual_departure IS NOT NULL 
  AND actual_departure - scheduled_departure > INTERVAL '1 hour';