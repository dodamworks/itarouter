package common

import (
	"strings"
	"testing"
)

func TestValidateRegistrationPassword(t *testing.T) {
	for _, tc := range []struct {
		name, password string
		valid          bool
	}{
		{"numeric only", "12345678", false}, {"missing special", "Example123", false},
		{"missing number", "Example!!", false}, {"missing letter", "1234567!", false},
		{"minimum boundary", "Abcdef1!", true}, {"too short", "Abcde1!", false},
		{"maximum boundary", strings.Repeat("a", 125) + "A1!", true},
		{"over maximum", strings.Repeat("a", 126) + "A1!", false},
		{"Unicode preserved", "한글🔒Abc1!", true}, {"space is not special", "Example1 ", false},
		{"invalid UTF8", string([]byte{0xff}) + "Abcdef1!", false},
	} {
		t.Run(tc.name, func(t *testing.T) {
			if got := ValidateRegistrationPassword(tc.password) == nil; got != tc.valid {
				t.Errorf("valid = %v, want %v", got, tc.valid)
			}
		})
	}
}

func TestHistoricalPasswordAuthenticationDoesNotApplyRegistrationPolicy(t *testing.T) {
	hash, err := Password2Hash("12345678")
	if err != nil {
		t.Fatal(err)
	}
	if !ValidatePasswordAndHash("12345678", hash) {
		t.Fatal("existing credentials must still authenticate")
	}
}
