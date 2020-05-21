export const URL = {
    client: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "Umów e-wizytę": { url: "/clients/new-appointment" },
        "Odbyj e-wizytę": { url: "/clients/appointment" },
        "Historia leczenia": { url: "/clients/examination-history" },
        "Wyniki badań": { url: "/clients/examination-results" }
    },

    doctor: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "E-wizyty": { url: "/doctors/appointments" },
        "Pacjenci": { url: "/doctors/patients" }
    },

    receptionist: {
        "Strona główna": { url: "/" },
        "Lekarze": { url: "/doctors" },
        "Badania": { url: "/examinations" },
        "E-wizyty": { url: "/receptionists/appointments" },
        "Pacjenci": { url: "/receptionists/patients" }
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
