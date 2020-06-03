export const URL = {
    client: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "Panel pacjenta": { url: "/client/homepage" },
        "Umów e-wizytę": { url: "/client/new-appointment" },
        "Historia leczenia": { url: "/client/examination-history" },
        "Wyniki badań": { url: "/client/examination-results" }
    },

    doctor: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "Panel doktora": { url: "/doctor/homepage" },
        "E-wizyty": { url: "/doctor/appointments" },
        "Pacjenci": { url: "/doctor/patients" }
    },

    receptionist: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "Panel recepcjonisty": { url: "/receptionist/homepage" },
        "E-wizyty": { url: "/receptionist/appointments" },
        "Pacjenci": { url: "/receptionist/patients" }
    },

    default: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" }
    },

    get
};

function get(userType) {
    switch(userType) {
        case "Client":
            return URL.client;
        case "Doctor":
            return URL.doctor;
        case "Receptionist":
            return URL.receptionist;
        default:
            return URL.default;
    }
}
