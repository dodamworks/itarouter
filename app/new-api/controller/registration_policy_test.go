package controller

import (
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func TestRegistrationRejectsInvalidCredentialsBeforeDatabase(t *testing.T) {
	oldRegister, oldPassword := common.RegisterEnabled, common.PasswordRegisterEnabled
	common.RegisterEnabled, common.PasswordRegisterEnabled = true, true
	t.Cleanup(func() { common.RegisterEnabled, common.PasswordRegisterEnabled = oldRegister, oldPassword })
	for _, tc := range []struct{ name, username, password, message string }{
		{"overlong username", "abcdefghijklmnopqrstu", "Example1!", "Username must contain no more than 20 characters."},
		{"numeric password", "test-user", "12345678", "Password must include a letter, a number, and a special character."},
		{"missing special", "test-user", "Example123", "Password must include a letter, a number, and a special character."},
	} {
		t.Run(tc.name, func(t *testing.T) {
			body, err := common.Marshal(map[string]string{"username": tc.username, "password": tc.password})
			require.NoError(t, err)
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = httptest.NewRequest("POST", "/api/user/register", strings.NewReader(string(body)))
			c.Request.Header.Set("Content-Type", "application/json")
			Register(c)
			var response struct {
				Success bool   `json:"success"`
				Message string `json:"message"`
			}
			require.NoError(t, common.Unmarshal(w.Body.Bytes(), &response))
			require.False(t, response.Success)
			require.Equal(t, tc.message, response.Message)
		})
	}
}
