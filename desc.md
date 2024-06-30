## Rozgrzewka z TS, konfiguracja środowiska, prosty CRUD

### Konfiguracja środowiska
Utwórz nowy projekt z wykorzystaniem serwera Vite (npm create vite@latest)

### Aplikacja ManagMe - starter
Budujemy aplikację do zarządzania projektami. 
- Zrealizuj funkcjonalność CRUD dotyczącą projektu. 
- Dane zapisz w localStorage - napisz dedykowaną klasę do komunikacji z api (tymczasowym api będzie localStorage)

Model projektu: id, nazwa, opis

### Użytkownik
- zamodeluj klasę zarządzającą zalogowanym użytkownikiem. Na ten moment chcemy mock zalogowanego użytkownika (bez opcji logowania, zakładania konta etc)
### Aktywny projekt
- Zrealizuj w aplikacji wybór "aktualnego" projektu. Czyli wybieram projekt, apka go zapamiętuje (api) i do czasu zmiany wszystko co widzę w aplikacji jest związane jedynie z tym projektem.
### Historyjki (funkcjonalności) projektu
- Zrealizuj CRUD do historyjki (funkcjonalności) w projekcie  
- Historyjki powinny się zapisywać za pośrednictwem zaprojektowanej poprzednio klasy do komunikacji z api
- Widok listy historyjek powininen dzielić historyjki na aktualnie wykonywane, czekające na wykonanie i zamknięte (lub jedna lista z filtrowaniem)

Model użytkownika: id, imię, nazwisko  
Model historyjki: id, nazwa, opis, priorytet (niski/średni/wysoki), projekt, data utworzenia, stan (todo/doing/done), właściciel (id użytkownika)

### Użytkownicy
- Rozbuduj model użytkownika o rolę. Możliwe role: admin, devops, developer.
- Zamockuj listę użytkowników. Zalogowany pozostaje admin, na liście powinien być jeszcze min. jeden developer i jeden devops  
### Zadania
Zadanie to najmniejsza jednostka projektu. Jest wykonywana przez jedną osobę, jest przypisane do konkretnej historyjki/funkcjonalności, jest możliwe do zamknięcia. 
- Zrealizuj CRUD do zadania. 
- Zrealizuj widok szczegółów zadania - dane zadania oraz nazwa projektu, przypisana funkcjonalność, data startu, zrealizowane roboczogodziny, przypisana osoba 
- Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość przypisania osoby do zadania (devops lub developer). Przypisanie osoby automatycznie zmienia stan zadania z "todo" na "doing" oraz uzupełnia datę startu zadania.
- Widok szczegółów zadania (lub dodatkowy widok) powinien dostarczać możliwość zmiany stanu zadania na "done". Zmiana stanu automatycznie uzupełnia datę zakończenia zadania.
- Zrealizuj widok tablicy kanban z zadaniami (kolumny todo, doing, done)
- Zadania powinny się zapisywać za pośrednictwem mechanizmu komunikacji z api


Model Zadania: 
- Nazwa
- Opis
- Priorytet (niski/średni/wysoki)
- Historyjka do której przynależy zadanie
- Przewidywany czas wykonania
- Stan (todo, doing, done). Zadanie ze stanem doing musi posiadać czas startu oraz przypisanego użytkownika. Zadanie ze stanem done posiada przypisanego użytkownika oraz datę zakończenia
- Data dodania
- Data startu (stan zmieniony na doing)
- Data zakończenia (stan zmieniony na done)
- Użytkownik odpowiedzialny za zadanie (zadanie może wykonywać devops lub developer)

### Logowanie
- Utwórz formularz logowania (pola: login, hasło)
- Dane powinny zostać wysłane do API (zaprojektuj endpoint)

### API
- zaprojektuj endpoint do logowania - pobiera login i hasło, weryfikuje i zwraca token (JWT) i refreshToken lub błąd
- zaprojektuj endpoint do odświeżania tokenu JWT

### Wygląd aplikacji
- Skorzystaj z dowolnej biblioteki CSS/komponentów (przykładowe biblioteki poniżej) do dopracowania UI aplikacji.  
Jeśli masz gotowe swoje własne style - nie musisz ich zmieniać (zobacz wtedy jak działają poniższe biblioteki)
- Zaimplementuj tryb ciemny/jasny (przełącznik na stronie lub zależny od ustawień przeglądarki)

#### Przykładowe biblioteki CSS/komponentów:
- [Bootstrap](https://getbootstrap.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com)
- [Material Web](https://m3.material.io/develop/web)
- [PrimeNg](https://primeng.org/)
- [Ant Design](https://ant.design/)
- [Angular Material](https://material.angular.io/)
- [ChakraUI](https://v2.chakra-ui.com/)
- [KitWind](https://kitwind.io/products/)
- [TailBlocks](https://tailblocks.cc/)
- [Tailwindcomponents](https://tailwindcomponents.com/)

### Baza danych
- Zmień miejsce magazynowania danych w aplikacji z localStorage na bazę danych. Wykorzystaj bazę NoSQL (np. MongoDB, Google Firestore).
- Komunikację z bazą danych może się odbywać zarówno bezpośrednio z aplikacji webowej jak i z pośrednictwem serwera backendowego (do wyboru) 

### Powiadomienia
- Zaprojektuj serwis powiadomień w aplikacji. Serwis (klasa) jako minimum powinien udostępniać w swoim API metody:
```js 
send(notification: Notification)    // wysłanie powiadomienia
list():Observable<Notification[]>   // lista powiadomień
unreadCount(): Observable<number>   // licznik nieprzeczytanych powiadomień
```
(oczywiście możesz zamodelować klasę wg własnego pomysłu:))
- Zaimplementuj komponent licznika nieprzeczytanych powiadomień (np. na pasku nawigacji).
- Zaimplementuj komponent widoku wszystkich powiadomień (np. po kliknięciu w licznik)
- Zaimplementuj komponent okna dialogowego z powiadomieniami (pokazuje się od razu przy wysłaniu powiadomienia, tylko dla powiadomień o prority 'medium' i 'high')
- Emituj powiadomienia przy przypisaniu nowego elementu (projektu/story/taska) do użytkownika

### RxJS
- Użyj biblioteki RxJS by zamodelować listę oraz licznik powiadomień jako strumienie.

#### Model powiadomienia
```js
type ISOString = string
type Notification = {
  title: string,
  message: string,
  date: ISOString,
  prority: 'low'|'medium'|'high',
  read: boolean
  }
```
