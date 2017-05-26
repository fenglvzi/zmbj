package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Objects;

/**
 * Created by Administrator on 2017/5/25 0025.
 *提供下载
 */
@WebServlet(name = "DownloadServlet")
public class DownloadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //1.拿到后台传输的文件名
        String filecode=request.getParameter("id");
        filecode = new String(filecode.getBytes("iso8859-1"),"UTF-8");//转码
        //提供下载文件的根目录
        String fileRootPath=this.getServletContext().getRealPath("/WEB-INF/upload");
        String filepath="";
        if (Objects.equals(filecode, "1")){
            filepath=fileRootPath+"\\"+filecode+".apk";
        }else if (Objects.equals(filecode, "2")){
            filepath=fileRootPath+"\\"+filecode+".ipa";
        }else {
            request.setAttribute("message", "您要下载的资源已被删除！！");
            request.getRequestDispatcher("/message.jsp").forward(request, response);
            return;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
