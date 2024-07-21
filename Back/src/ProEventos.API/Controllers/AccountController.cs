using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Extensions;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly ITokenService _tokenService;

    public AccountController(IAccountService accountService, ITokenService tokenService)
    {
        _accountService = accountService;
        _tokenService = tokenService;
    }

    [HttpGet("GetUser")]
    public async Task<IActionResult> GetUser(){
        try
        {
            var userName = User.GetUserName();
            var user = await _accountService.GetUserByUserNameAsync(userName);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar Usuário. Erro: {ex}");
        }
    }

    [HttpPost("Register")]
    [AllowAnonymous]
    public async Task<IActionResult> RegisterUser(UserDto userDto){
        try
        {
            if(await _accountService.UserExists(userDto.UserName)){
                return BadRequest("Usuário já existe");
            }
            var user = await _accountService.CreateAccountAsync(userDto);
            if(user !=null){
                return Ok(user);
            }
            
            return  BadRequest("Usuário não criado. Tente novamente mais tarde!");
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar criar Usuário. Erro: {ex}");
        }
    }
    [HttpPost("Login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserLoginDto userLogin){
        try
        {
            var user = await _accountService.GetUserByUserNameAsync(userLogin.UserName);
            if(user == null){ return Unauthorized("Usuário não existe"); }

            var result = await _accountService.CheckUserPasswordAsync(user, userLogin.Password);
            if(!result.Succeeded) return Unauthorized();

            return Ok(new{
                userName = user.UserName,
                PrimeiroNome = user.PrimeiroNome,
                token = _tokenService.CreateToken(user)
            });
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar logar Usuário. Erro: {ex}");
        }
    }
    [HttpPut("UpdateUser")]
    public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto){
        try
        {
            var user = await _accountService.GetUserByUserNameAsync(User.GetUserName());
            if(user == null){ return Unauthorized("Usuário Inválido"); }

            var userReturn = await _accountService.UpdateAccount(userUpdateDto);
            if(userReturn ==null){ return NoContent(); }
            
            return  Ok(userReturn);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar Usuário. Erro: {ex}");
        }
    }

}

